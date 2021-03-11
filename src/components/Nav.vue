<template>
  <nav class="nav absolute w-full hidden">
    <ul class="nav-list flex">
      <li>
        <router-link to="/">Home</router-link> |
      </li>
      <li>
        <router-link to="/about">about</router-link>      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Nav extends Vue {}
</script>

<style lang="scss" scoped>
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>