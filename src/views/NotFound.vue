<template>
  <div class="not-found">
    <h1 class="text-4xl py-6">HTTP 404</h1>
    <router-link to="/" class="bg-blue-500 hover:bg-blue-700 text-white font-semibold hover:text-white py-2 px-4 rounded">Back</router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
@Options({})
export default class NotFound extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style";

.not-found {
  background: $clear-bg;
  font-family: "Oswald", sans-serif;
  color: $clear-text;
  @apply w-full h-full flex flex-col justify-center items-center;
  h1 {
    color: #ffffff;
  }
}
</style>

