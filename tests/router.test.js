import { it, expect, vi } from 'vitest'
import router from '../src/router'
import http from '../src/services/http'
import store from '../src/store'

it('missing auth opens sign-in immediately without waking the backend',async()=>{
 localStorage.clear();const adapter=vi.fn();http.defaults.adapter=adapter;await router.push('/post');expect(router.currentRoute.value.name).toBe('sign_in');expect(adapter).not.toHaveBeenCalled()
})
it('valid auth can open deep links; network failure is preserved as a retryable message',async()=>{
 localStorage.setItem('authorization','Bearer test');http.defaults.adapter=config=>Promise.resolve({data:{},status:200,config});await router.push('/post');expect(router.currentRoute.value.name).toBe('post');
 http.defaults.adapter=config=>Promise.reject(Object.assign(new Error('timeout'),{config,code:'ECONNABORTED'}));await router.push('/setting');expect(router.currentRoute.value.name).toBe('sign_in');expect(store.state.authError).toContain('逾時');expect(localStorage.getItem('authorization')).toBe('Bearer test');localStorage.clear()
})
