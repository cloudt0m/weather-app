<template>
  <Nav></Nav>
  <router-view />
</template>
<script lang="ts">
import Nav from "@/components/Nav.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: { Nav },
})
export default class App extends Vue {}
</script>
<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
}
</style>
