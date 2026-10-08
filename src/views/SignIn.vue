<template>
  <div class="sign-in-view">
    <div class="middle">
      <div class="container border">
        <img v-image="bg" fetchpriority="high" decoding="async" class="cursor-none hide" :src="bg" alt="" @load="successLoadImg" />
        <div class="auth-content">
          <h2 class="cursor-none">MetaWall</h2>
          <h3>到元宇宙展開全新社交圈</h3>
          <VForm @submit="signIn">
            <div class="input-group">
              <label class="input-wrapper" for="email">
                <VField
                  id="email"
                  v-model="user.email"
                  class="border"
                  name="Email"
                  aria-label="Email"
                  type="email"
                  placeholder="Email"
                  :rules="{ required: true, email: true }"
                  autocomplete="username"
                />
                <div class="tooltip">
                  <div class="title">SAMPLE</div>
                  <div>帳 - test1@example.com</div>
                  <div>密 - Test123456</div>
                </div>
                <error-message name="Email"
                  aria-label="Email" />
              </label>
              <label class="input-wrapper" for="password">
                <VField
                  id="password"
                  v-model="user.password"
                  class="border"
                  name="Password"
                  aria-label="Password"
                  type="password"
                  placeholder="Password"
                  autocomplete="current-password"
                  rules="required"
                />
                <div class="tooltip">
                  <div class="title">SAMPLE</div>
                  <div>帳 - test1@example.com</div>
                  <div>密 - Test123456</div>
                </div>
                <error-message name="Password"
                  aria-label="Password" />
              </label>
            </div>
            <div v-if="err || connectionError" class="error-message" role="alert">{{ err || connectionError }}</div>
            <button class="btn border submit" type="submit" :disabled="submitting">登入</button>
          </VForm>
          <router-link class="btn link" :to="{ name: 'sign_up' }">註冊帳號</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignInView',
  data() { return { user: { email: '', password: '' }, err: '', submitting: false, bg: process.env.VUE_APP_SIGN_BG } },
  computed: { connectionError() { return this.$store.state.authError } },
  watch: { user: { deep: true, handler() { this.err = ''; this.$store.commit('authError', '') } } },
  methods: {
    async signIn() {
      if (this.submitting) return
      this.submitting = true
      this.err = ''
      this.$store.commit('authError', '')
      try {
        const res = await this.$http.post(`${process.env.VUE_APP_API}/user/sign_in`, this.user, { skipAuth: true })
        localStorage.setItem('authorization', `Bearer ${res.data.user.token}`)
        await this.$router.push({ name: 'posts_wall' })
      } catch (error) { this.err = this.$errorMessage(error) }
      finally { this.submitting = false }
    }
  }
}
</script>

<style lang="scss" src="@/assets/scss/site/_sign.scss" scoped></style>

