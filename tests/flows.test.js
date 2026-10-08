import { it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import PostsWall from '../src/views/PostsWall.vue'
import SubNav from '../src/components/SubNav.vue'
import SignIn from '../src/views/SignIn.vue'
import Post from '../src/views/Post.vue'
import Security from '../src/views/Security.vue'
import validateUpload from '../src/methods/upload'
import image from '../src/directives/image'

const globals={directives:{image:{}},stubs:{RouterLink:{template:'<a><slot /></a>'},VForm:{template:'<form><slot :errors="{}" /></form>'},VField:true,ErrorMessage:true},mocks:{$store:{state:{authError:''},commit:vi.fn()},$errorMessage:()=> '目前無法連線',successLoadImg:()=>{}}}
it('a slow previous search cannot replace the latest result',async()=>{
 const pending=[];const get=vi.fn(()=>new Promise(resolve=>{pending.push(resolve)}));
 const w=mount(PostsWall,{global:{...globals,stubs:{SubNav:true,Posts:true,PostsNone:true},mocks:{...globals.mocks,$http:{get},$route:{name:'posts_wall',query:{q:'first'}}}}});
 const second=w.vm.getPosts();pending[1]({data:{posts:[{_id:'new'}]}});await second;pending[0]({data:{posts:[{_id:'old'}]}});await flushPromises();expect(w.vm.posts).toEqual([{_id:'new'}]);w.unmount()
})
it('sorting and search controls reflect a refreshed URL and preserve each other',()=>{
 const w=mount(SubNav,{global:{...globals,mocks:{$route:{query:{q:'hello',timeSort:'asc'}}}}});expect(w.get('input').element.value).toBe('hello');expect(w.text()).toContain('最舊貼文');expect(w.vm.query()).toEqual({q:'hello',timeSort:'asc'});expect(w.vm.query('desc')).toEqual({q:'hello'});w.unmount()
})
it('sign-in blocks duplicate submissions and can retry identical credentials after a network failure',async()=>{
 const post=vi.fn().mockRejectedValue({});const w=mount(SignIn,{global:{...globals,mocks:{...globals.mocks,$http:{post},$router:{push:vi.fn()}}}});
 const first=w.vm.signIn();w.vm.signIn();expect(post).toHaveBeenCalledTimes(1);await first;expect(w.vm.submitting).toBe(false);expect(w.vm.err).toContain('連線');await w.vm.signIn();expect(post).toHaveBeenCalledTimes(2);w.unmount()
})
it('upload cancellation sends nothing; invalid type and size are rejected locally',async()=>{
 const post=vi.fn();const w=mount(Post,{global:{...globals,mocks:{...globals.mocks,$http:{post}}}});await w.vm.upload({target:{files:[],value:''}});expect(post).not.toHaveBeenCalled();expect(validateUpload({name:'a.txt',size:1},1)).toContain('格式');expect(validateUpload({name:'a.png',size:1048577},1)).toContain('1mb');expect(validateUpload({name:'a.PNG',size:32},1)).toBe('');w.unmount()
})
it('cached images become visible and failed images have a visible fallback',()=>{
 const img=document.createElement('img');img.src='https://example.test/a.png';img.className='hide';Object.defineProperty(img,'complete',{value:true});Object.defineProperty(img,'naturalWidth',{value:100});image.mounted(img);expect(img.classList.contains('hide')).toBe(false);img.dispatchEvent(new Event('error'));expect(img.alt).toContain('無法載入');image.unmounted(img)
})
it('lazy images can finish loading, recover after a failed source and release their handlers',()=>{
 const img=document.createElement('img');img.src='https://example.test/lazy.png';img.loading='lazy';img.className='hide';
 Object.defineProperty(img,'complete',{value:false,configurable:true});image.mounted(img);
 expect(img.classList.contains('hide')).toBe(true);
 img.dispatchEvent(new Event('load'));expect(img.classList.contains('hide')).toBe(false);
 img.dispatchEvent(new Event('error'));expect(img.dataset.loadError).toBe('true');
 img.src='https://example.test/replacement.png';image.updated(img,{value:img.src,oldValue:'https://example.test/lazy.png'});
 expect(img.dataset.loadError).toBeUndefined();expect(img.alt).toBe('');
 img.dispatchEvent(new Event('load'));expect(img.classList.contains('hide')).toBe(false);
 image.unmounted(img);img.dispatchEvent(new Event('error'));expect(img.dataset.loadError).toBeUndefined()
})

it('password success immediately uses the returned token for later requests',async()=>{
 const commit=vi.fn();const w=mount(Security,{global:{...globals,mocks:{...globals.mocks,$http:{patch:vi.fn().mockResolvedValue({data:{user:{token:'local-token'}}})},$store:{commit},$swal:vi.fn()}}});
 await w.setData({password:'OnlyTest123',confirmPassword:'OnlyTest123'});await w.vm.updated();expect(localStorage.getItem('authorization')).toBe('Bearer local-token');expect(commit).toHaveBeenCalledWith('headers',{headers:{authorization:'Bearer local-token'}});localStorage.clear();w.unmount()
})
