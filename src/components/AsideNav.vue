<template>
  <div class="aside-nav">
    <ul class="nav border bg-white">
      <li>
        <router-link class="btn" aria-label="張貼動態" to="/post">
          <span class="fw-bold btn post radius"> 張貼動態 </span>
          <div class="border btn circle">
            <span class="material-icons"> add </span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link class="btn link" aria-label="我的貼文牆" :to="{ path: `/profile/${user._id}` }">
          <div class="user-photo border circle">
            <img v-image="user.photo" loading="lazy" decoding="async" class="hide" :src="user.photo" alt="" @load="successLoadImg" />
          </div>
          <span class="fw-bold">{{ user.name }}</span>
        </router-link>
      </li>
      <li>
        <router-link class="btn link" aria-label="追蹤名單" :to="{ path: `/follow_list` }">
          <div class="btn-icon border circle">
            <span class="material-icons"> notifications_none </span>
          </div>
          <span class="fw-bold">追蹤名單</span>
        </router-link>
      </li>
      <li>
        <router-link class="btn link" aria-label="我按讚的文章" :to="{ path: `/like_list` }">
          <div class="btn-icon border circle">
            <span class="material-icons"> thumb_up_off_alt </span>
          </div>
          <span class="fw-bold">我按讚的文章</span>
        </router-link>
      </li>
    </ul>
    <div class="copyright border radius">
      <ul class="external-link">
        <li>
          <a class="btn" href="https://github.com/cutecat8110/metawall-front" target="_blank">
            <span class="material-icons"> desktop_windows </span>
            前端
          </a>
        </li>
        <li>
          <a
            class="btn"
            href="https://metawall-backend-c89d.onrender.com/api-docs/"
            target="_blank"
          >
            <span class="material-icons"> settings_ethernet </span>
            API
          </a>
        </li>
        <li>
          <a class="btn" href="https://github.com/cutecat8110/metawall-back" target="_blank">
            <span class="material-icons"> storage </span>
            後端
          </a>
        </li>
      </ul>
      Copyright © 2022 by Hao / 作品展示
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsideNavCMPT',
  computed: {
    user() {
      const { user } = this.$store.state
      return user
    }
  }
}
</script>

<style lang="scss" scoped>
.aside-nav {
  position: sticky;
  top: 6.75rem;
  display: flex;
  flex-direction: column;

  gap: 1rem;
  > .nav {
    padding: 2rem 1.5rem;
  }

  @media (max-width: $pad) {
    position: static;
    top: auto;
    .nav {
      padding: 0.5rem;
    }
  }
}

.nav {
  display: grid;

  gap: 1rem;
  @media (max-width: $pad) {
    display: flex;
    justify-content: center;

    border-radius: 50rem;

    gap: 1.5rem;
    li:first-child {
      order: 4;
    }
  }
  @media (max-width: $mobile) {
    justify-content: space-around;

    gap: normal;
  }
}

.post {
  padding: 1rem;

  border: 2px solid $black;
  background: $blue-dark;
  box-shadow: -2px 2px 0 $black;

  color: $white;
  text-align: center;

  &:hover {
    background: $yellow;

    color: $black;
  }
  & ~ .circle {
    display: none;

    background: $blue-dark;

    color: $white;
    @media (max-width: $pad) {
      display: flex;
    }
    &:hover {
      background: $yellow;

      color: $black;
    }
  }
}

.fw-bold {
  transition: $transition-1;
  @media (max-width: $pad) {
    display: none;
  }
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.125rem;
  height: 3.125rem;

  background: $blue-light;

  transition: $transition-1;
  @media (max-width: $pad) {
    width: 3rem;
    height: 3rem;
  }
}

.link {
  display: flex;
  align-items: center;

  .circle {
    margin-right: 1rem;
    @media (max-width: $pad) {
      margin-right: 0;
    }
  }

  img {
    transition: $transition-1;
  }

  &:hover {
    > .fw-bold {
      color: $blue-dark;
    }

    .btn-icon {
      background: $blue-dark;

      color: $white;
    }

    img {
      filter: brightness(0.9);
    }
  }
}

.copyright {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.75rem;

  border-color: $grey-translucent;
  background: $grey-light;

  color: $grey-dark;
  font-weight: 300;
  font-size: 0.75rem;
  @media (max-width: $pad) {
    display: none;
  }
  .external-link {
    display: flex;
    margin-bottom: 0.25rem;

    li {
      display: flex;
      align-items: center;

      &:not(:last-child)::after {
        margin: 0 0.75rem;
        width: 1px;
        height: 0.75rem;

        background: $grey-translucent;

        content: '';
      }
    }
    a {
      display: flex;
      align-items: center;

      color: $grey-darker;
      font-weight: 400;
      font-size: 0.875rem;

      &:hover {
        opacity: 0.7;
      }
      .material-icons {
        margin-right: 0.5rem;

        font-size: 1rem;
      }
    }
  }
}
</style>

