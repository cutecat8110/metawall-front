<template>
  <div class="follow-list">
    <Title :title="'追蹤名單'" />
    <div v-for="follow in list" :key="follow.user._id" class="card border bg-white shadow radius">
      <router-link
        class="user-photo border circle btn"
        :to="{ path: `/profile/${follow.user._id}` }"
      >
        <img v-image="follow.user.photo || photo" loading="lazy" decoding="async" width="40" height="40" class="hide" :src="follow.user.photo || photo" alt="" @load="successLoadImg" />
      </router-link>
      <router-link class="fw-bold btn" :to="{ path: `/profile/${follow.user._id}` }">
        {{ follow.user.name }}
      </router-link>
      <span class="created"> 追蹤時間：{{ $filters.date(follow.createdAt) }} </span>
      <span class="day">您已追蹤 {{ $filters.now(follow.createdAt) }}! </span>
    </div>
    <p v-if="requestError" class="error-message" role="alert">{{ requestError }} <button type="button" class="btn" @click="getList">重新載入</button></p>
    <PostsNone v-if="loaded && !requestError && list.length === 0" />
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import PostsNone from '@/components/PostsNone.vue'

export default {
  name: 'FollowListView', components: { Title, PostsNone },
  data() { return { list: [], photo: process.env.VUE_APP_USER_PHOTO, loaded: false, requestError: '' } },
  created() { this.getList() },
  methods: {
    async getList() {
      this.loaded = false; this.requestError = ''
      try {
        const res = await this.$http.get(`${process.env.VUE_APP_API}/user/profile`)
        this.list = res.data.user.following.filter(item => item.user)
      } catch (error) { this.requestError = this.$errorMessage(error) }
      finally { this.loaded = true }
    }
  }
}
</script>

<style lang="scss" scoped>
.follow-list {
  display: grid;
  grid-gap: 1rem;
}

.card {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) auto;
  padding: 1rem;

  column-gap: 1rem;
}

.user-photo {
  grid-row-end: 3;
  grid-row-start: 1;
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

.created {
  grid-column-end: 3;
  grid-column-start: 2;

  color: $grey-dark;
  font-size: 0.875rem;
}

.fw-bold {
  &:hover {
    color: $blue-dark;
    text-decoration: underline;
  }
}

.day {
  font-size: 0.875rem;
}
.card a.fw-bold, .info .fw-bold { white-space: normal; overflow-wrap: anywhere; }
@media (max-width: $mobile) { .card { column-gap: 0.5rem; padding: 1rem 0.75rem; } }
@media (max-width: $pad) { .day { grid-column: 2 / -1; } .created { grid-column: 2 / -1; } }
</style>
