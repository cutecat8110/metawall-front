import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Posts from '../src/components/Posts.vue'

const post = (id='p1') => ({ _id:id, user:{_id:'a',name:'Alice',photo:'https://example.test/avatar.png'},content:'Hello',image:'https://example.test/post.png',likes:[],comments:[],createdAt:'2026-10-08' })
function setup(item=post()) {
 const http={post:vi.fn().mockResolvedValue({}),get:vi.fn().mockResolvedValue({data:{post:item}}),delete:vi.fn().mockResolvedValue({})}
 const wrapper=mount(Posts,{props:{tempPost:item},global:{directives:{image:{}},stubs:{RouterLink:{template:'<a><slot /></a>'}},mocks:{$errorMessage:()=> 'Request failed',$store:{state:{user:{_id:'b',photo:''},headers:{}},commit:vi.fn()},$http:http,$filters:{date:()=>''},successLoadImg:e=>e.target.classList.remove('hide')}}})
 return {wrapper,http}
}
describe('post interactions',()=>{
 it('Enter sends one trimmed comment and clears it only after success',async()=>{
  const {wrapper,http}=setup(); await wrapper.get('input').setValue(' hello '); await wrapper.get('input').trigger('keyup.enter'); await flushPromises();
  expect(http.post).toHaveBeenCalledTimes(1); expect(http.post.mock.calls[0][1]).toEqual({comment:'hello'}); expect(wrapper.get('input').element.value).toBe(''); wrapper.unmount()
 })
 it('image load makes the post image visible',async()=>{
  const {wrapper}=setup(); const img=wrapper.get('.image-wrapper img'); await img.trigger('load'); expect(img.classes()).not.toContain('hide'); wrapper.unmount()
 })
 it('comment fields have a unique identifier for each post',()=>{
  const a=setup(post('p1'));const b=setup(post('p2')); expect(a.wrapper.get('input').attributes('id')).not.toBe(b.wrapper.get('input').attributes('id'));a.wrapper.unmount();b.wrapper.unmount()
 })
 it('rapid comment and like actions do not duplicate a pending request',async()=>{
  const {wrapper,http}=setup();let resolve;http.post.mockReturnValue(new Promise(r=>{resolve=r}));await wrapper.get('input').setValue('Hello');wrapper.vm.send();wrapper.vm.send();expect(http.post).toHaveBeenCalledTimes(1);resolve({});await flushPromises();
  http.post.mockClear();http.post.mockReturnValue(new Promise(r=>{resolve=r}));wrapper.vm.toggle(false);wrapper.vm.toggle(false);expect(http.post).toHaveBeenCalledTimes(1);resolve({});await flushPromises();wrapper.unmount()
 })
 it('a delayed like refresh cannot erase a newer comment response',async()=>{
  const {wrapper,http}=setup();const pending=[];
  http.get.mockImplementation(()=>new Promise(resolve=>{pending.push(resolve)}));
  const liking=wrapper.vm.toggle(false);await flushPromises();
  await wrapper.get('input').setValue('new comment');const sending=wrapper.vm.send();await flushPromises();
  const latest={...post(),likes:['b'],comments:[{_id:'c1',user:{_id:'b',name:'Bob',photo:''},comment:'new comment'}]};
  pending[1]({data:{post:latest}});await sending;
  pending[0]({data:{post:{...post(),likes:['b']}}});await liking;
  expect(wrapper.vm.post.comments).toHaveLength(1);expect(wrapper.text()).toContain('new comment');
  expect(wrapper.get('.likes').attributes('aria-pressed')).toBe('true');wrapper.unmount()
 })
 it('an obsolete refresh failure cannot replace a successful newer state with an error',async()=>{
  const {wrapper,http}=setup();let rejectOld;
  http.get.mockImplementationOnce(()=>new Promise((resolve,reject)=>{rejectOld=reject}));
  const liking=wrapper.vm.toggle(false);await flushPromises();
  await wrapper.vm.upload();rejectOld(new Error('late failure'));await liking;
  expect(wrapper.vm.requestError).toBe('');wrapper.unmount()
 })
 it('new parent data and unmount invalidate pending post refreshes',async()=>{
  const {wrapper,http}=setup();let resolve;
  http.get.mockImplementation(()=>new Promise(r=>{resolve=r}));
  const first=wrapper.vm.upload();await wrapper.setProps({tempPost:{...post(),content:'fresh parent'}});
  resolve({data:{post:post()}});await first;expect(wrapper.vm.post.content).toBe('fresh parent');
  const second=wrapper.vm.upload();const instance=wrapper.vm;wrapper.unmount();
  resolve({data:{post:post()}});await second;expect(instance.post.content).toBe('fresh parent')
 })
 it('comment avatars reserve their box and defer loading like other feed images',()=>{
  const {wrapper}=setup({...post(),comments:[{user:{_id:'b',name:'Bob',photo:''},comment:'hello'}]});
  const img=wrapper.get('.comments img');expect(img.attributes()).toMatchObject({loading:'lazy',decoding:'async',width:'45',height:'45'});wrapper.unmount()
 })
})
