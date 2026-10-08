<template>
  <div class="profile">
    <div class="header-wrapper">
      <div class="header border bg-white radius">
        <div class="user-photo">
          <img v-image="profile.photo" class="hide" :src="profile.photo" alt="" @load="successLoadImg" />
        </div>
        <div class="info">
          <div>
            <h1>{{ profile.name }}</h1>
            <span v-if="profile.name"> {{ $filters.currency(followers.length) }} 人追蹤 </span>
          </div>
          <button
            v-if="user._id !== profile._id && profile.name"
            :class="{ follow: follow }"
            class="btn border radius shadow fw-bold"
            type="button"
            @click="toggle(follow)" :disabled="following"
          >
            {{ follow ? '取消追蹤' : '追蹤' }}
          </button>
        </div>
      </div>
      <div class="mat border bg-white radius"></div>
    </div>
    <SubNav />
    <p v-if="requestError" class="error-message" role="alert">{{ requestError }} <button type="button" class="btn" @click="load">重新載入</button></p>
    <PostsNone v-if="loaded && !requestError && posts.length === 0" />
    <Posts v-for="item in posts" :key="item._id" :tempPost="item" />
  </div>
</template>

<script>
import Posts from '@/components/Posts.vue'
import PostsNone from '@/components/PostsNone.vue'
import SubNav from '@/components/SubNav.vue'

export default {
  name: 'ProfileView', components: { Posts, PostsNone, SubNav },
  data() { return { posts: [], profile: { _id: '', name: '', photo: '', followers: [] }, following: false, loaded: false, requestError: '', requestVersion: 0 } },
  mounted() { this.load() },
  beforeUnmount() { this.requestVersion += 1 },
  watch: { $route() { if (this.$route.name === 'profile') this.load() } },
  computed: {
    user() { return this.$store.state.user },
    followers() { return this.profile.followers.map(item => item.user) },
    follow() { return this.followers.includes(this.user._id) }
  },
  methods: {
    async load() {
      this.requestVersion += 1
      const version = this.requestVersion
      const { p } = this.$route.params
      this.loaded = false; this.requestError = ''
      this.profile = { _id: '', name: '', photo: '', followers: [] }; this.posts = []
      try {
        const [posts, profile] = await Promise.all([
          this.$http.get(`${process.env.VUE_APP_API}/posts`, { params: { ...this.$route.query, p } }),
          this.$http.get(`${process.env.VUE_APP_API}/user/profile`, { params: { p } })
        ])
        if (version !== this.requestVersion) return
        this.posts = posts.data.posts
        this.profile = { ...profile.data.user, photo: profile.data.user.photo || process.env.VUE_APP_USER_PHOTO_2 }
      } catch (error) { if (version === this.requestVersion) this.requestError = this.$errorMessage(error) }
      finally { if (version === this.requestVersion) this.loaded = true }
    },
    async toggle(follow) {
      if (this.following) return
      this.following = true; this.requestError = ''
      const { p } = this.$route.params
      try {
        const api = `${process.env.VUE_APP_API}/user/${p}/follow`
        if (follow) await this.$http.delete(api)
        else await this.$http.post(api)
        if (p === this.$route.params.p) await this.load()
      } catch (error) { this.requestError = this.$errorMessage(error) }
      finally { this.following = false }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  display: grid;
  grid-gap: 1rem;
}

.header-wrapper {
  position: relative;

  .header {
    position: relative;
    z-index: 1;
    display: flex;
    height: 5rem;

    .user-photo {
      width: 5rem;

      border-right: 2px solid $black;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      width: 100%;
      h1 {
        font-size: 1rem;
      }
      .btn {
        padding: 0.375rem 2rem;

        background: $yellow;
        &.follow {
          background: $grey-light;
        }
        &:hover {
          background: $blue-dark;

          color: $white;
        }
      }
    }
  }
  .mat {
    position: absolute;
    top: 5px;
    left: -5px;
    width: 100%;
    height: 100%;
  }
}
</style>

