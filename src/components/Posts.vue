<template>
  <div class="post border bg-white radius shadow">
    <!-- 貼文資訊 -->
    <div class="header">
      <router-link class="user-photo border circle btn" :to="{ path: `/profile/${post.user._id}` }">
        <img v-image="photo" loading="lazy" decoding="async" class="hide" :src="photo" alt="" @load="successLoadImg" />
      </router-link>
      <div class="info">
        <router-link class="btn fw-bold" :to="{ path: `/profile/${post.user._id}` }">
          {{ post.user.name }}
        </router-link>
        <span>{{ $filters.date(post.createdAt) }}</span>
      </div>
    </div>

    <!-- 貼文內容 -->
    <p class="content">
      {{ post.content }}
    </p>

    <!-- 貼文圖片 -->
    <div v-if="post.image" class="image-wrapper border radius">
      <div class="clamp" :style="paddingBottom">
        <img v-image="post.image"
          ref="postsPhoto"
          loading="lazy" decoding="async"
          class="hide"
          :src="post.image"
          alt=""
          @load="successLoadImg($event); size()"
        />
      </div>
    </div>

    <!-- 按讚 -->
    <button
      :class="{ selected: isSelected }"
      class="likes btn"
      type="button"
      @click="toggle(isSelected)"
      :disabled="liking"
      :aria-pressed="isSelected"
    >
      <span class="material-icons"> thumb_up_off_alt </span>
      {{ post.likes.length == 0 ? '成為第一個按讚的朋友' : post.likes.length }}
    </button>

    <!-- 留言 -->
    <div class="comment-wrapper">
      <router-link class="user-photo border circle btn" :to="{ path: `/profile/${user._id}` }">
        <img v-image="user.photo" loading="lazy" decoding="async" class="hide" :src="user.photo" alt="" @load="successLoadImg" />
      </router-link>
      <div class="comment border">
        <label :for="`comment-${post._id}`">
          <input
            :id="`comment-${post._id}`"
            v-model="comment"
            type="text"
            placeholder="留言..."
            @keyup.enter="send"
            aria-label="留言"
          />
        </label>
        <button class="btn" type="button" @click="send" :disabled="sending || !comment.trim()">留言</button>
      </div>
    </div>

    <div v-if="requestError" class="error-message" role="alert">{{ requestError }}</div>
    <div v-for="(comment, key) in post.comments" :key="key" class="comments">
      <div class="header">
        <router-link
          class="user-photo border circle btn"
          :to="{ path: `/profile/${comment.user._id}` }"
        >
          <img v-image="comment.user.photo !== '' ? comment.user.photo : commentPhoto"
            class="hide"
            :src="comment.user.photo !== '' ? comment.user.photo : commentPhoto"
            alt=""
            @load="successLoadImg"
          />
        </router-link>

        <div class="info">
          <router-link class="btn fw-bold" :to="{ path: `/profile/${comment.user._id}` }">
            {{ comment.user.name }}
          </router-link>
          <span>{{ $filters.date(comment.createdAt) }}</span>
        </div>
      </div>
      <p>
        {{ comment.comment }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsCMPT', props: ['tempPost'],
  data() { return { post: this.tempPost, comment: '', paddingBottom: {}, commentPhoto: process.env.VUE_APP_USER_PHOTO, liking: false, sending: false, requestError: '' } },
  watch: { tempPost: { deep: true, handler(value) { this.post = value } } },
  computed: {
    user() { return this.$store.state.user },
    photo() { return this.post.user.photo || process.env.VUE_APP_USER_PHOTO },
    isSelected() { return this.post.likes.includes(this.user._id) }
  },
  methods: {
    async toggle(isSelected) {
      if (this.liking) return
      this.liking = true; this.requestError = ''
      const api = `${process.env.VUE_APP_API}/post/${this.post._id}/likes`
      try {
        if (isSelected) await this.$http.delete(api)
        else await this.$http.post(api)
        await this.upload()
      } catch (error) { this.requestError = this.$errorMessage(error) }
      finally { this.liking = false }
    },
    async send(event) {
      const comment = this.comment.trim()
      if (event?.isComposing || this.sending || !comment) return
      this.sending = true; this.requestError = ''
      try {
        await this.$http.post(`${process.env.VUE_APP_API}/post/${this.post._id}/comment`, { comment })
        if (this.comment.trim() === comment) this.comment = ''
        await this.upload()
      } catch (error) { this.requestError = this.$errorMessage(error) }
      finally { this.sending = false }
    },
    async upload() {
      const res = await this.$http.get(`${process.env.VUE_APP_API}/post/${this.post._id}`)
      this.post = res.data.post
    },
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
  padding: 1.5rem;
}

.user-photo {
  &:hover {
    img {
      filter: brightness(0.9);
    }
  }
  img {
    transition: $transition-1;
  }
}

.header {
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 45px minmax(0, 1fr);
  .user-photo {
    width: 45px;
    height: 45px;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  a {
    width: fit-content;
    &:hover {
      color: $blue-dark;
      text-decoration: underline;
    }
  }
  span {
    color: $grey-dark;
    font-size: 0.75rem;
  }
}

.content {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.image-wrapper {
  background: $blue-light;

  .clamp {
    position: relative;
    overflow: hidden;
    padding-bottom: 52.35%;
  }
  img {
    position: absolute;
    display: block;
    width: 100%;
  }
}

.likes {
  display: flex;
  align-items: center;
  width: fit-content;

  color: $grey-dark;
  &:hover {
    color: $blue-dark;
  }
  span {
    margin-right: 0.5rem;
  }
  &.selected {
    color: $blue-dark;
  }
}

.comment-wrapper {
  display: grid;
  grid-gap: 0.5rem;
  width: 100%;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  .user-photo {
    width: 2.5rem;
    height: 2.5rem;
  }
  .comment {
    display: flex;

    label {
      min-width: 0;
      padding: 0.5rem 1rem;
      width: 100%;

      border-right: 2px solid $black;
    }

    input {
      width: 100%;

      outline: none;
      border: 0;
    }

    .btn {
      padding: 0.5rem 3rem;

      background: $blue-dark;

      color: $white;

      &:hover {
        background: $yellow;

        color: $black;
      }
      @media (max-width: $pad) {
        padding: 0.5rem 2.25rem;
      }
      @media (max-width: $mobile) {
        padding: 0.5rem 1.5rem;
      }
    }
  }
}

.comments {
  padding: 1rem;

  border-radius: 0.75rem;
  background: $grey-light;
  p {
    margin-left: calc(45px + 1rem);
    overflow-wrap: anywhere;
  }
}
@media (max-width: $mobile) {
  .post { padding: 1rem; }
  .comment-wrapper .comment .btn { padding: 0.5rem; }
  .comment-wrapper .comment label { padding: 0.5rem; }
}
</style>

