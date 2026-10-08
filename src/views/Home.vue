<template>
  <div class="posts-wall">
    <Header></Header>
    <main class="container">
      <article>
        <div v-if="requestError" class="error-message" role="alert">{{ requestError }} <button class="btn" type="button" @click="getUser">重新載入</button></div>
        <router-view v-if="ready" />
      </article>
      <aside>
        <AsideNav></AsideNav>
      </aside>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import AsideNav from '@/components/AsideNav.vue'

export default {
  name: 'HomeView', components: { Header, AsideNav },
  data() { return { ready: false, requestError: '' } },
  created() { this.getUser() },
  methods: {
    async getUser() {
      this.requestError = ''
      try {
        const { data: { user } } = await this.$http.get(`${process.env.VUE_APP_API}/user/profile`)
        this.$store.commit('user', { ...user, photo: user.photo || process.env.VUE_APP_USER_PHOTO })
        this.ready = true
      } catch (error) { this.requestError = this.$errorMessage(error) }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-gap: 1.75rem;
  grid-template-columns: minmax(0, 5fr) minmax(0, 3fr);
  margin-top: 3rem;
  margin-bottom: 3.875rem;

  @media (max-width: $pad) {
    grid-gap: 0;
    grid-template-columns: minmax(0, 1fr);
    margin-bottom: 6rem;
  }
}
@media (max-width: $pad) {
  aside {
    position: fixed;
    z-index: 90;
    bottom: 0;
    left: 0;
    padding: 0.5rem;
    width: 100%;
  }
}
</style>

