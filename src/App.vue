<template>
  <Nav></Nav>
  <transition name="loading">  
    <div class="loading" v-if="isLoading">
      <img src="images/loading.png" alt="">
    </div>
  </transition>
  <router-view />
</template>
<script lang="ts">
import Nav from "@/components/Nav.vue";
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";

@Options({
  components: { Nav },
  computed: {
    ...mapState({ isLoading: (state: any) => state.isLoading }),
  },})
export default class App extends Vue {}
</script>
<style lang="scss">
@import '@/assets/scss/style';

html, body, #app {
  width: 100%;
  height: 100%;
}
#app {
  background: $clear-bg;
}
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  pointer-events: none;
  transition: 1s ease-out;
  &-leave-active {
    opacity: 1;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-active {
    opacity: 0;
  }
  &-enter-to {
    opacity: 1;
  }
}
</style>
