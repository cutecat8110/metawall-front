const handlers = new WeakMap()
function show(image) {
  image.classList.remove('hide')
  const clamp = image.closest('.clamp')
  if (clamp && image.naturalWidth) clamp.style.paddingBottom = `${Math.min(150, image.naturalHeight / image.naturalWidth * 100)}%`
}
export default {
  mounted(image) {
    const alt = image.getAttribute('alt') || ''
    const load = () => { show(image); image.removeAttribute('data-load-error'); image.setAttribute('alt', alt) }
    const error = () => {
      show(image)
      image.setAttribute('data-load-error', 'true')
      image.setAttribute('alt', '圖片暫時無法載入')
    }
    image.addEventListener('load', load)
    image.addEventListener('error', error)
    handlers.set(image, {load, error, alt})
    if (image.complete && image.getAttribute('src')) {
      if (image.naturalWidth) load()
      else error()
    }
  },
  updated(image, binding) {
    if (binding.value !== binding.oldValue) {
      image.removeAttribute('data-load-error')
      image.setAttribute('alt', handlers.get(image)?.alt || '')
      if (image.complete && image.naturalWidth) handlers.get(image)?.load()
    }
  },
  unmounted(image) {
    const saved = handlers.get(image)
    if (saved) { image.removeEventListener('load', saved.load); image.removeEventListener('error', saved.error) }
    handlers.delete(image)
  }
}
