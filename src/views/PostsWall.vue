<template>
  <div class="posts-wall">
    <SubNav />
    <p v-if="requestError" class="error-message" role="alert">{{ requestError }} <button type="button" class="btn" @click="getPosts">重新載入</button></p>
    <PostsNone v-if="loaded && !requestError && posts.length === 0" />
    <Posts v-for="item in posts" :key="item._id" :tempPost="item" />
  </div>
</template>

<script>
import Posts from '@/components/Posts.vue'
import PostsNone from '@/components/PostsNone.vue'
import SubNav from '@/components/SubNav.vue'

export default {
  name: 'PostsWallView', components: { Posts, PostsNone, SubNav },
  data() { return { posts: [], loaded: false, requestError: '', requestVersion: 0 } },
  mounted() { this.getPosts() },
  beforeUnmount() { this.requestVersion += 1 },
  watch: { $route() { if (this.$route.name === 'posts_wall') this.getPosts() } },
  methods: {
    async getPosts() {
      this.requestVersion += 1
      const version = this.requestVersion
      this.loaded = false; this.requestError = ''
      try {
        const res = await this.$http.get(`${process.env.VUE_APP_API}/posts`, { params: this.$route.query })
        if (version === this.requestVersion) this.posts = res.data.posts
      } catch (error) { if (version === this.requestVersion) this.requestError = this.$errorMessage(error) }
      finally { if (version === this.requestVersion) this.loaded = true }
    }
  }
}
</script>

<style lang="scss" scoped>
.posts-wall {
  display: grid;
  grid-gap: 1rem;
  width: 100%;
}
</style>

