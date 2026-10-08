<template>
  <div class="account">
    <VForm v-slot="{ errors }" @submit="updated">
      <!-- 頭像 -->
      <div class="user-photo border circle">
        <img v-image="user.photo" class="hide" :src="user.photo" alt="" @load="successLoadImg" />
      </div>
      <!-- 上傳按鈕 -->
      <div class="upload-wrapper">
        <label class="upload btn radius" for="uploadImage">
          上傳大頭照
          <input id="uploadImage" class="file-input" name="uploadImage" type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png" :disabled="uploading || submitting"
          @change="upload" />
        </label>
        <error-message name="uploadImage">
          <div class="error-message">圖片格式錯誤，僅限 JPG、PNG 圖片</div>
        </error-message>
        <div v-if="errMessage" class="error-message" role="alert">{{ errMessage }}</div>
      </div>
      <!-- 暱稱 -->
      <label class="name-wrapper" for="name">
        <div class="title">暱稱</div>
        <VField
          id="name"
          v-model="user.name"
          class="name border"
          name="暱稱"
          placeholder="輸入您的暱稱"
          :rules="{ required: true, min: 2, max: 13 }"
        />
        <error-message class="error-message" name="暱稱" />
      </label>
      <!-- 性別 -->
      <div class="sex-wrapper">
        <div class="title">性別</div>
        <label class="radio-wrapper" for="male">
          <input id="male" v-model="user.sex" class="radio" type="radio" value="male" />
          <span class="radio-button"></span>
          男性
        </label>
        <label class="radio-wrapper" for="female">
          <input id="female" v-model="user.sex" class="radio" type="radio" value="female" />
          <span class="radio-button"></span>
          女性
        </label>
      </div>
      <!-- 送出按鈕 -->
      <button class="btn border submit" type="submit" :disabled="submitting || uploading || disabled(errors)">送出更新</button>
    </VForm>
  </div>
</template>

<script>
import validateUpload from '@/methods/upload'

export default {
  name: 'AccountView',
  data() { return { user: { photo: '', name: '', sex: '' }, errMessage: '', uploading: false, submitting: false } },
  computed: {
    tempUser() { return this.$store.state.user },
    compare() { return ['photo', 'name', 'sex'].some(key => this.user[key] !== this.tempUser[key]) }
  },
  watch: { tempUser: { deep: true, immediate: true, handler(user) { this.user = { photo: user.photo, name: user.name || '', sex: user.sex || 'male' } } } },
  methods: {
    async upload(event) {
      const file = event.target.files?.[0]
      if (!file || this.uploading || this.submitting) return
      this.errMessage = validateUpload(file, 2)
      const input = event.target
      input.value = ''
      if (this.errMessage) return
      this.uploading = true
      const data = new FormData(); data.append('file-to-upload', file)
      try {
        const res = await this.$http.post(`${process.env.VUE_APP_API}/upload/avatar`, data)
        this.user.photo = res.data.imgUrl
      } catch (error) { this.errMessage = this.$errorMessage(error) }
      finally { this.uploading = false }
    },
    async updated() {
      if (this.submitting || this.uploading) return
      this.submitting = true; this.errMessage = ''
      const data = {}
      if (this.user.name !== this.tempUser.name) data.name = this.user.name
      if (this.user.sex !== this.tempUser.sex) data.sex = this.user.sex
      if (this.user.photo !== this.tempUser.photo && this.user.photo !== process.env.VUE_APP_USER_PHOTO) data.photo = this.user.photo
      try {
        const { data: { user } } = await this.$http.patch(`${process.env.VUE_APP_API}/user/profile`, data)
        this.$store.commit('user', { ...user, photo: user.photo || process.env.VUE_APP_USER_PHOTO })
        this.$swal({ title: '資料已更新', icon: 'success', customClass: { actions: 'customize', icon: 'customize' } })
      } catch (error) { this.errMessage = this.$errorMessage(error) }
      finally { this.submitting = false }
    },
    disabled(errors) { return !this.user.name.trim() || Object.keys(errors).length > 0 || !this.compare }
  }
}
</script>

<style lang="scss" scoped>
.user-photo {
  margin: 0 auto 1rem auto;
  width: 6.75rem;
  height: 6.75rem;
}

.upload-wrapper {
  margin-bottom: 1rem;
  .error-message {
    text-align: center;
  }
}

.upload {
  margin: 0 auto;
  padding: 0.25rem 2rem;
  width: fit-content;

  background: $black;

  color: $white;
  line-height: 1.5em;
  &:hover {
    background: $blue-dark;
  }
}

.title {
  margin-bottom: 0.25rem;
}

.name-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  .border {
    padding: 0.75rem 1rem;
  }
}

.sex-wrapper {
  margin-bottom: 2rem;
}

.radio-wrapper {
  display: inline-flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
}

.radio {
  position: absolute;
  opacity: 0;
  &:focus-visible + .radio-button { outline: 2px solid $blue-dark; outline-offset: 3px; }
  &:checked ~ .radio-button::after {
    opacity: 1;
  }
}

.radio-button {
  position: relative;
  margin-right: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;

  border: 2px solid $black;
  border-radius: 50%;
}

.radio-button::after {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.625rem;
  height: 0.625rem;

  border-radius: 50%;
  background-color: $black;

  content: '';

  opacity: 0;
  transition: $transition-1;
  transform: translate(-50%, -50%);
}

.error-message {
  margin-top: 0.25rem;

  color: $pink;
  text-align: start;

  font-size: 0.875rem;
}
</style>

