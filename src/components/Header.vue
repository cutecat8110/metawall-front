<template>
  <header>
    <div class="container">
      <router-link class="btn logo" to="/">MetaWall</router-link>
      <div ref="memberWrapper" class="member-wrapper" @keydown.esc.stop.prevent="closeMenu">
        <button ref="memberButton" class="member-btn btn" :aria-expanded="select" aria-controls="member-dropdown" type="button" @click="toggle()">
          <div class="user-photo border circle">
            <img v-image="user.photo" class="hide" :src="user.photo" alt="" @load="successLoadImg" />
          </div>
          <span class="member-text">Member</span>
        </button>
        <div v-if="select" id="member-dropdown" ref="memberDropdown" class="border bg-white dropdown-wrapper">
          <ul class="border bg-white dropdown">
            <li class="btn">
              <router-link class="btn link" :to="{ path: `/profile/${user._id}` }" @click="toggle">
                我的貼文牆
              </router-link>
            </li>
            <li class="btn">
              <router-link class="btn link" :to="{ path: `/setting` }" @click="toggle">
                修改個人資料
              </router-link>
            </li>
            <li><button class="btn logout" type="button" @click="signOut">登出</button></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderCMPT',
  data() {
    return {
      select: false
    }
  },
  mounted() {
    document.addEventListener('click', this.memberDropdownClick)
    window.addEventListener('resize', this.memberDropdownOffset)
  },
  updated() {
    if (this.$refs.memberDropdown) {
      this.memberDropdownOffset()
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.memberDropdownClick)
    window.removeEventListener('resize', this.memberDropdownOffset)
  },
  watch: {
    $route() {
      this.select = false
    }
  },
  computed: {
    user() {
      const { user } = this.$store.state
      return user
    }
  },
  methods: {
    closeMenu() { this.select = false; this.$refs.memberButton.focus() },
    toggle() {
      this.select = !this.select
    },
    memberDropdownClick(e) {
      if (this.$refs.memberDropdown) {
        const isSelf = this.$refs.memberWrapper.contains(e.target)
        if (!isSelf) {
          this.select = false
        }
      }
    },
    memberDropdownOffset() {
      if (this.$refs.memberDropdown) {
        const rem = getComputedStyle(document.documentElement).fontSize.replace(
          /[^0-9]+(.[0-9]{2})?$/gi,
          ''
        )
        const bodyWidth = document.body.clientWidth
        const dropdownWidth = this.$refs.memberDropdown.getBoundingClientRect().width
        const memberX = this.$refs.memberWrapper.getBoundingClientRect().x
        this.$refs.memberDropdown.style.transform = 'translateY(100%)'
        if (bodyWidth - rem < memberX + dropdownWidth) {
          const offset = bodyWidth - dropdownWidth - memberX - rem + 5
          this.$refs.memberDropdown.style.transform = `translate(${offset}px,100%)`
        }
      }
    },
    signOut() {
      localStorage.removeItem('authorization')
      this.$store.commit('user', {})
      this.$store.commit('headers', {})
      this.$store.commit('authError', '')
      this.$router.push({ name: 'sign_in' })
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: $h-header;

  border-bottom: 3px solid $black;
  background: $white;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  color: $black;
  font-size: 1.625rem;
  font-family: 'Paytone One', sans-serif;
}

.member-wrapper {
  position: relative;
  height: 100%;
}

.member-btn {
  display: flex;
  align-items: center;
  height: 100%;
  &:hover {
    .member-text {
      color: $blue-dark;
    }
  }
}

.loading-image {
  width: 30px;
  height: 30px;
}

.user-photo {
  margin-right: 10px;
  width: 30px;
  height: 30px;

  background: $blue-light;
}

.member-text {
  padding: 0 0.25rem 0.25rem 0.25rem;

  border-bottom: 2px solid $black;

  font-weight: Bold;
  font-size: 1rem;
  font-family: 'Azeret Mono', monospace;
  transition: $transition-1;
}

.dropdown-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;

  transform: translateY(100%);
}

.logout { width: 100%; }

.dropdown {
  transform: translate(-5px, -5px);

  .btn {
    padding: 0.5rem 2.5rem;
    @media (max-width: $pad) {
      padding: 0.5rem 1.5rem;
    }

    text-align: center;
    &:not(:last-child) {
      border-bottom: 2px solid $black;
    }
    &:hover {
      background: $grey-light;
    }
  }
}
</style>

