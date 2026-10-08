<template>
  <div class="subnav">
    <div ref="filterWrapper" class="filter-wrapper" @keydown.esc.stop.prevent="closeMenu">
      <button ref="filterButton" :aria-expanded="select" aria-controls="sort-dropdown" class="btn border bg-white filter" type="button" @click="toggle()">
        {{ asc ? '最舊貼文' : '最新貼文' }}
        <span class="material-icons">expand_more</span>
      </button>
      <div v-if="select" id="sort-dropdown" ref="filterDropdown" class="border bg-white dropdown-wrapper">
        <ul class="border bg-white dropdown">
          <li>
            <router-link class="btn" :to="{ query: query('desc') }" @click="toggle()">
              最新貼文
              <span v-if="!asc" class="material-icons">check</span>
            </router-link>
          </li>
          <li>
            <router-link class="btn" :to="{ query: query('asc') }" @click="toggle()">
              最舊貼文
              <span v-if="asc" class="material-icons">check</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="border bg-white search">
      <label for="search">
        <input
          id="search"
          v-model="search"
          type="text"
          placeholder="搜尋貼文"
          aria-label="搜尋貼文"
          @keyup.enter="searchEnter"
        />
      </label>
      <router-link class="btn" aria-label="搜尋" :to="{ query: query() }">
        <span class="material-icons"> search </span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubNavCMPT',
  data() {
    return {
      select: false,
      posts: {},
      search: '',
      asc: false
    }
  },
  mounted() {
    document.addEventListener('click', this.filterDropdownClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.filterDropdownClick)
  },
  watch: {
    $route: { immediate: true, handler() {
      this.select = false
      this.asc = this.$route.query.timeSort === 'asc'
      this.search = this.$route.query.q || ''
    } }
  },
  methods: {
    query(sort = this.$route.query.timeSort) {
      const query = {}
      if (sort === 'asc') query.timeSort = 'asc'
      if (this.search !== '') query.q = this.search
      return query
    },
    closeMenu() { this.select = false; this.$refs.filterButton.focus() },
    toggle() {
      this.select = !this.select
    },
    filterDropdownClick(e) {
      if (this.$refs.filterDropdown) {
        const isSelf = this.$refs.filterWrapper.contains(e.target)
        if (!isSelf) {
          this.select = false
        }
      }
    },
    searchEnter() {
      this.$router.push({
        query: this.query()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.subnav {
  display: grid;
  grid-gap: 0.75rem;
  grid-template-columns: 9.75rem 1fr;
  @media (max-width: $pad) {
    grid-template-columns: 1fr;
  }
}

.filter-wrapper {
  position: relative;
}

.filter {
  width: 100%;
}

.filter,
.dropdown .btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .material-icons {
    font-size: 1.25rem;
  }
}

.dropdown-wrapper {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;

  transform: translateY(calc(100% - 2px));
}

.dropdown {
  transform: translate(-5px, -5px);

  li {
    &:not(:last-child) {
      border-bottom: 2px solid $black;
    }
    &:hover {
      background: $grey-light;
    }
  }
}

.filter,
.search label,
.dropdown .btn {
  padding: 0.75rem 1rem;
}

.search {
  display: grid;
  grid-template-columns: 1fr 2.875rem;

  label {
    border-right: 2px solid $black;
  }

  input {
    width: 100%;

    outline: none;
    border: 0;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;

    background: $blue-dark;

    color: $white;

    transition: $transition-1;
    &:hover {
      background: $yellow;
    }
  }
}
</style>

