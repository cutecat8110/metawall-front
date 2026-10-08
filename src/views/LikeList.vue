<template>
  <div class="like-list">
    <Title :title="'我按讚的貼文'" />
    <div v-for="post in posts" :key="post._id" class="card border bg-white shadow radius">
      <router-link class="user-photo border circle btn" :to="{ path: `/profile/${post.user._id}` }">
        <img v-image="post.user.photo || photo" class="hide" :src="post.user.photo || photo" alt="" @load="successLoadImg" />
      </router-link>
      <div class="info">
        <router-link class="fw-bold btn" :to="{ path: `/profile/${post.user._id}` }">
          {{ post.user.name }}
        </router-link>
        <span class="created">發文時間：{{ $filters.date(post.createdAt) }} </span>
      </div>
      <button class="cancel btn fw-bold" type="button" @click="unlike(post._id)" :disabled="pending.includes(post._id)">
        <span class="material-icons"> thumb_up_off_alt </span>
        取消
      </button>
      <router-link
        class="check btn fw-bold"
        :to="{ path: `/like_list`, query: { id: `${post._id}` } }"
      >
        <span class="material-icons"> arrow_circle_up </span>
        查看
      </router-link>
    </div>
    <Posts v-if="Object.keys(post).length > 0" :tempPost="post" />
    <p v-if="requestError" class="error-message" role="alert">{{ requestError }} <button type="button" class="btn" @click="loadData">重新載入</button></p>
    <PostsNone v-if="!requestError && posts.length === 0 && !post._id && load" />
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import Posts from '@/components/Posts.vue'
import PostsNone from '@/components/PostsNone.vue'

export default {
  name: 'LikeListView', components: { Title, Posts, PostsNone },
  data() { return { posts: [], post: {}, photo: process.env.VUE_APP_USER_PHOTO, load: false, requestError: '', requestVersion: 0, pending: [] } },
  watch: { $route: { immediate: true, handler() { if (this.$route.name === 'like_list') this.loadData() } } },
  beforeUnmount() { this.requestVersion += 1 },
  methods: {
    async loadData() {
      this.requestVersion += 1
      const version = this.requestVersion
      const { id } = this.$route.query
      this.load = false; this.requestError = ''; this.posts = []; this.post = {}
      try {
        const res = await this.$http.get(`${process.env.VUE_APP_API}${id ? `/post/${id}` : '/user/likeList'}`)
        if (version !== this.requestVersion) return
        if (id) this.post = res.data.post
        else this.posts = res.data.posts
      } catch (error) { if (version === this.requestVersion) this.requestError = this.$errorMessage(error) }
      finally { if (version === this.requestVersion) this.load = true }
    },
    async unlike(id) {
      if (this.pending.includes(id)) return
      this.pending.push(id)
      try {
        await this.$http.delete(`${process.env.VUE_APP_API}/post/${id}/likes`)
        this.posts = this.posts.filter(post => post._id !== id)
      } catch (error) { this.requestError = this.$errorMessage(error) }
      finally { this.pending = this.pending.filter(value => value !== id) }
    }
  }
}
</script>

<style lang="scss" scoped>
.like-list {
  display: grid;
  grid-gap: 1rem;
}

.card {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) auto auto;
  align-items: center;
  padding: 1rem 2rem 1rem 1rem;

  column-gap: 1rem;
}

.user-photo {
  align-items: center;
  height: 2.5rem;
  &:hover {
    img {
      filter: brightness(0.9);
    }
  }
  img {
    transition: $transition-1;
  }
}

.info .fw-bold {
  &:hover {
    color: $blue-dark;
    text-decoration: underline;
  }
}

.created {
  color: $grey-dark;
  font-size: 0.875rem;
}

.cancel,
.check {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 0.5rem;
}

.cancel .material-icons {
  color: $blue-dark;
}

.check .material-icons {
  transition: $transition-1;
  transform: rotate(90deg);
}

.day {
  font-size: 0.875rem;
}
.card a.fw-bold, .info .fw-bold { white-space: normal; overflow-wrap: anywhere; }
@media (max-width: $mobile) { .card { column-gap: 0.5rem; padding: 1rem 0.75rem; } }
</style>

