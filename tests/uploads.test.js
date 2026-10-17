import { it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Post from '../src/views/Post.vue'
import Account from '../src/views/Account.vue'

function setup(component, post) {
  const wrapper = mount(component, {
    global: {
      directives: { image: {} },
      stubs: { Title: true, VForm: { template: '<form><slot :errors="{}" /></form>' }, VField: true, ErrorMessage: true },
      mocks: {
        $http: { post },
        $store: { state: { user: { name: 'QA Member', photo: 'https://example.test/original.png', sex: 'male' } } },
        $errorMessage: () => '圖片服務暫時無法上傳，請稍後再試',
        successLoadImg: () => {}
      }
    }
  })
  // Keep Vue 3.2 compatibility; newer VTU attachTo uses app.onUnmount (Vue 3.5).
  document.body.appendChild(wrapper.element)
  return wrapper
}
const choose = () => ({ target: { files: [new File(['png'], 'same.png', { type: 'image/png' })], value: 'same.png' } })

;[['post', Post, 'image', '/upload/post'], ['avatar', Account, 'photo', '/upload/avatar']].forEach(([name, component, key, endpoint]) => {
  it(`${name}: cancellation and failures keep the existing image; the same file can be retried`, async () => {
    const post = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue({ data: { imgUrl: 'https://example.test/new.png' } })
    const wrapper = setup(component, post)
    if (key === 'image') await wrapper.setData({ image: 'https://example.test/original.png', content: 'Keep this draft' })
    const current = () => key === 'image' ? wrapper.vm.image : wrapper.vm.user.photo
    await wrapper.vm.upload({ target: { files: [], value: '' } })
    expect(post).not.toHaveBeenCalled()
    const event = choose()
    await wrapper.vm.upload(event)
    expect(event.target.value).toBe('')
    expect(current()).toBe('https://example.test/original.png')
    expect(wrapper.get('[role="alert"]').text()).toContain('稍後再試')
    if (key === 'image') expect(wrapper.vm.content).toBe('Keep this draft')
    await wrapper.vm.upload(choose())
    expect(post).toHaveBeenCalledTimes(2)
    expect(post.mock.calls[1][0]).toMatch(new RegExp(`${endpoint}$`))
    expect(post.mock.calls[1][1].get('file-to-upload').name).toBe('same.png')
    expect(current()).toBe('https://example.test/new.png')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    wrapper.unmount()
  })

  it(`${name}: pending uploads disable selection and submission and ignore duplicate uploads`, async () => {
    let finish
    const post = vi.fn(() => new Promise(resolve => { finish = resolve }))
    const wrapper = setup(component, post)
    const pending = wrapper.vm.upload(choose())
    await wrapper.vm.upload(choose())
    expect(post).toHaveBeenCalledTimes(1)
    expect(wrapper.get('input[type="file"]').element.disabled).toBe(true)
    expect(wrapper.get('button[type="submit"]').element.disabled).toBe(true)
    finish({ data: { imgUrl: 'https://example.test/saved.png' } })
    await pending
    expect(wrapper.get('input[type="file"]').element.disabled).toBe(false)
    wrapper.unmount()
  })
})

it('removing an image returns keyboard focus to upload and preserves the text draft', async () => {
  const wrapper = setup(Post, vi.fn())
  await wrapper.setData({ image: 'https://example.test/image.png', content: 'Keep this draft' })
  const remove = wrapper.get('button[aria-label="移除圖片"]')
  remove.element.focus()
  await remove.trigger('click')
  await flushPromises()
  expect(wrapper.vm.image).toBe('')
  expect(wrapper.vm.content).toBe('Keep this draft')
  expect(document.activeElement).toBe(wrapper.get('input[type="file"]').element)
  wrapper.unmount()
})

it('a removed image cannot be restored by a late upload response', async () => {
  let finish
  const wrapper = setup(Post, () => new Promise(resolve => { finish = resolve }))
  await wrapper.setData({ image: 'https://example.test/old.png' })
  const pending = wrapper.vm.upload(choose())
  wrapper.vm.clearImg()
  finish({ data: { imgUrl: 'https://example.test/late.png' } })
  await pending
  expect(wrapper.vm.image).toBe('')
  expect(wrapper.vm.uploading).toBe(false)
  wrapper.unmount()
})
