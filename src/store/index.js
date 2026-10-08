import { createStore } from 'vuex'

export default createStore({
  state: { isLoading: false, pendingRequests: 0, authError: '', user: {}, headers: {} },
  mutations: {
    requestStarted(state) { state.pendingRequests += 1; state.isLoading = true },
    requestFinished(state) { state.pendingRequests = Math.max(0, state.pendingRequests - 1); state.isLoading = state.pendingRequests > 0 },
    authError(state, message) { state.authError = message },
    headers(state, headers) { state.headers = headers },
    user(state, user) { state.user = user }
  }
})
