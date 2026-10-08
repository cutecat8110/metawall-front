<template>
  <div class="post">
    <Title :title="'張貼動態'" />
    <VForm v-slot="{ errors }" class="border bg-white radius" @submit="createPosts">
      <label class="content-wrapper" for="content"
        >貼文內容
        <VField
          id="content"
          v-model="content"
          class="content border"
          name="內容"
          placeholder="輸入您的貼文內容"
          as="textarea"
          rules="required"
        />
        <error-message name="內容" />
      </label>
      <label class="btn upload" for="uploadImage">
        上傳圖片
        <input id="uploadImage" class="file-input" name="uploadImage" type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png" :disabled="uploading || submitting"
          @change="upload" />
      </label>
      <div class="image-wrapper border radius">
        <div class="clamp" :style="paddingBottom">
          <div v-if="!image" class="cover border cursor-none radius">
            <span class="material-icons"> image </span>
          </div>
          <template v-if="image">
            <img v-image="image" ref="postsPhoto" class="hide" :src="image" alt="" @load="successLoadImg($event); size()" />
            <button class="btn border clear circle" type="button" @click="clearImg">
              <span class="material-icons"> close </span>
            </button>
          </template>
        </div>
      </div>
      <error-message name="uploadImage">
        <div class="error-message">圖片格式錯誤，僅限 JPG、PNG 圖片</div>
      </error-message>
      <div v-if="errMessage" class="error-message" role="alert">{{ errMessage }}</div>
      <div class="submit-wrapper">
        <button class="btn border submit" type="submit" :disabled="submitting || uploading || disabled(errors)">
          送出貼文
        </button>
      </div>
    </VForm>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import validateUpload from '@/methods/upload'

export default {
  name: 'PostView', components: { Title },
  data() { return { content: '', image: '', errMessage: '', paddingBottom: {}, uploading: false, submitting: false, uploadVersion: 0 } },
  beforeUnmount() { this.uploadVersion += 1 },
  methods: {
    async createPosts() {
      if (this.submitting || this.uploading || !this.content.trim()) return
      this.submitting = true; this.errMessage = ''
      try {
        await this.$http.post(`${process.env.VUE_APP_API}/post`, { image: this.image, content: this.content })
        await this.$router.push({ name: 'posts_wall' })
      } catch (error) { this.errMessage = this.$errorMessage(error) }
      finally { this.submitting = false }
    },
    async upload(event) {
      const file = event.target.files?.[0]
      if (!file || this.uploading || this.submitting) return
      this.errMessage = validateUpload(file, 1)
      const input = event.target
      input.value = ''
      if (this.errMessage) return
      this.uploadVersion += 1
      const version = this.uploadVersion
      const data = new FormData(); data.append('file-to-upload', file)
      this.uploading = true
      try {
        const res = await this.$http.post(`${process.env.VUE_APP_API}/upload/post`, data)
        if (version === this.uploadVersion) this.image = res.data.imgUrl
      } catch (error) { if (version === this.uploadVersion) this.errMessage = this.$errorMessage(error) }
      finally { this.uploading = false }
    },
    clearImg() { this.uploadVersion += 1; this.image = ''; this.paddingBottom = { paddingBottom: '52.35%' } },
    disabled(errors) { return !this.content.trim() || Object.keys(errors).length > 0 },
    size() {
      const image = this.$refs.postsPhoto
      if (image?.naturalWidth) this.paddingBottom = { paddingBottom: `${Math.min(150, image.naturalHeight / image.naturalWidth * 100)}%` }
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  display: grid;
  grid-gap: 1rem;
}

form {
  padding: 2rem;
}

.content-wrapper {
  display: block;
  margin-bottom: 1rem;

  font-weight: Normal;
  font-size: 1rem;
  span {
    color: $pink;
    font-size: 0.875rem;
  }
}

.content {
  display: block;
  margin-top: 0.25rem;
  padding: 0.75rem 1rem;
  width: 100%;
  height: 10.5rem;

  outline: none;

  resize: none;
}

.upload {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.25rem 2rem;

  border-radius: 0.25rem;
  background: $black;

  color: $white;
  line-height: 1.5em;
  &:hover {
    background: $blue-dark;
  }
}

.image-wrapper {
  overflow: hidden;
  margin-bottom: 2rem;

  background: $blue-light;

  .clamp {
    position: relative;
    padding-bottom: 52.35%;
  }
  .clear {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;

    background: $blue-light;
    &:hover {
      background: $blue-dark;

      color: $white;

      transition: $transition-1;
    }
  }

  img {
    position: absolute;
    display: block;
    width: 100%;
  }
  .cover {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);

    border: 2px dashed $grey-translucent;

    color: $grey-translucent;
    vertical-align: middle;
    font-size: 1.25rem;

    transform: translate(-50%, -50%);
    span {
      font-size: 5.75rem;
    }
  }
}

.error-message {
  margin-bottom: 1rem;

  text-align: center;
}

.submit-wrapper {
  padding: 0 4.5rem;
}
</style>

