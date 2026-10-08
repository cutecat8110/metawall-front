import { beforeEach, it, expect, vi } from 'vitest'
import http, { errorMessage, setUnauthorizedHandler } from '../src/services/http'
import store from '../src/store'

beforeEach(() => { localStorage.clear(); store.state.pendingRequests=0; store.state.isLoading=false; store.commit('user',{}); setUnauthorizedHandler(()=>{}) })
it('loading stays active until every overlapping response or failure settles',async()=>{
 const pending=[];http.defaults.adapter=config=>new Promise((resolve,reject)=>{pending.push({config,resolve,reject})});
 const a=http.get('/a');const b=http.get('/b').catch(()=>{});await Promise.resolve();await Promise.resolve();
 expect(store.state.pendingRequests).toBe(2);pending[0].resolve({data:{},status:200,config:pending[0].config});await a;expect(store.state.isLoading).toBe(true);
 pending[1].reject({config:pending[1].config,message:'offline'});await b;expect(store.state.pendingRequests).toBe(0);expect(store.state.isLoading).toBe(false)
})
it('a failed old request cannot log out a newly signed-in session',async()=>{
 localStorage.setItem('authorization','Bearer old');const expired=vi.fn();setUnauthorizedHandler(expired);let reject;let config;
 http.defaults.adapter=c=>{config=c;return new Promise((r,j)=>{reject=j})};const pending=http.get('/profile').catch(()=>{});await Promise.resolve();await Promise.resolve();
 localStorage.setItem('authorization','Bearer new');reject({config,response:{status:401}});await pending;expect(expired).not.toHaveBeenCalled();expect(localStorage.getItem('authorization')).toBe('Bearer new')
})
it('a current-session 401 clears auth and notifies the router once',async()=>{
 localStorage.setItem('authorization','Bearer test');store.commit('user',{_id:'user'});const expired=vi.fn();setUnauthorizedHandler(expired);
 http.defaults.adapter=config=>Promise.reject(Object.assign(new Error('unauthorized'),{config,response:{status:401}}));await http.get('/profile').catch(()=>{});
 expect(localStorage.getItem('authorization')).toBeNull();expect(store.state.user).toEqual({});expect(expired).toHaveBeenCalledTimes(1)
})
it('network errors and a 90-second timeout have retryable messages',()=>{
 expect(http.defaults.timeout).toBe(90000);expect(errorMessage({code:'ECONNABORTED'})).toContain('逾時');expect(errorMessage({})).toContain('網路');expect(errorMessage({response:{data:{message:'email 已被註冊'}}})).toBe('email 已被註冊')
})
