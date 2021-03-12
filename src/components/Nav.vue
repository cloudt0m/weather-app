<template>
  <nav class="nav flex">
    <button
      class="hamburger pointer-events-auto"
      :class="{ 'is-active': isNavOpened }"
      type="button"
      @click="isNavOpened = !isNavOpened"
    >
      <div class="hamburger-box">
        <div class="hamburger-inner"></div>
      </div>
    </button>
    <ul
      class="nav-list flex pointer-events-auto px-4"
      v-if="isNavOpened"
    >
      <template
        v-for="(item, index) in navItems"
        :key="index"
      >
        <li class="nav-item px-2" @click="isNavOpened = !isNavOpened">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
        <span v-if="index != navItems.length - 1">/</span>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Nav extends Vue {
  isNavOpened = false;
  navItems = [
    {
      name: "HOME",
      path: "/",
    },
    {
      name: "ABOUT",
      path: "/about",
    },
  ];
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style";

nav {
  padding: 30px;
  @apply absolute w-full z-10 pointer-events-none;
  a {
    font-weight: bold;
    color: $clear-text;

    &.router-link-exact-active {
      color: $clear-active;
    }
  }
  span {
    color: $clear-text;
  }
}
.hamburger {
  border: 0;
  outline: 0;
  &-box {
    width: 2rem;
    height: 2rem;
    position: relative;
  }
  &-inner {
    width: 2rem;
    height: 2px;
    background: $clear-text;
    &:before,
    &:after {
      content: "";
      left: 0;
      position: absolute;
      width: 2rem;
      height: 2px;
      background: $clear-text;
    }
    &:before {
      top: calc((2rem - 2px) / 2);
    }
    &:after {
      bottom: 0;
    }
  }
  &.is-active .hamburger-inner {
    background: transparent;
    &:before {
      width: 44px;
      top: 0;
      transform-origin: left top;
      transform: rotate(45deg);
    }
    &:after {
      width: 44px;
      transform-origin: left bottom;
      transform: rotate(-45deg);
    }
  }
}
</style>