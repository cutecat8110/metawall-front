<template>
  <div class="security">
    <VForm v-slot="{ errors }" @submit="updated">
      <!-- 新密碼 -->
      <label class="input-wrapper" for="password">
        <div class="title">輸入新密碼</div>
        <VField
          id="password"
          v-model="password"
          class="border"
          name="新密碼"
          type="password"
          placeholder="請輸入新密碼"
          :rules="{ required: true, regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/ }"
        />
        <error-message name="新密碼">
          <span class="error-message"> Password 不能小於 8 個字元，需包含大小寫和數字 </span>
        </error-message>
      </label>
      <!-- 再次輸入 -->
      <label class="input-wrapper" for="confirmPassword">
        <div class="title">再次輸入</div>
        <VField
          id="confirmPassword"
          v-model="confirmPassword"
          class="border"
          name="再次輸入"
          type="password"
          placeholder="再次輸入新密碼"
          rules="required|confirmed:@新密碼"
        />
        <error-message class="error-message" name="再次輸入" />
      </label>
      <p v-if="requestError" class="error-message" role="alert">{{ requestError }}</p>
      <button class="btn border submit" type="submit" :disabled="submitting || disabled(errors)">重設密碼</button>
    </VForm>
  </div>
</template>

<script>
export default {
  name: 'SecurityView',
  data() { return { password: '', confirmPassword: '', requestError: '', submitting: false } },
  methods: {
    disabled(errors) { return !this.password || !this.confirmPassword || Object.keys(errors).length > 0 },
    async updated() {
      if (this.submitting) return
      this.submitting = true; this.requestError = ''
      try {
        const res = await this.$http.patch(`${process.env.VUE_APP_API}/user/updatePassword`, { password: this.password, confirmPassword: this.confirmPassword })
        const authorization = `Bearer ${res.data.user.token}`
        localStorage.setItem('authorization', authorization)
        this.$store.commit('headers', { headers: { authorization } })
        this.$swal({ title: '密碼已更新', icon: 'success', customClass: { actions: 'customize', icon: 'customize' } })
      } catch (error) { this.requestError = this.$errorMessage(error) }
      finally { this.submitting = false }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 0.25rem;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  .border {
    padding: 0.75rem 1rem;
  }
}
.error-message {
  margin-top: 0.25rem;

  color: $pink;
  text-align: start;
  font-size: 0.875rem;
}
</style>

