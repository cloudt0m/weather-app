<template>
  <div class="about">
    <h1 class="text-4xl py-6">Taiwan Weather App</h1>
    <h2 class="text-xl py-2">Fetch weather data according to your location.<br />Work with following APIs:<br />
      <ul class="list-disc py-6 ml-8">
        <li
          v-for="(item, index) in techLists"
          :key="index"
        >{{ item }}</li>
      </ul>
    </h2>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { mapState } from "vuex";

@Options({
  computed: {
    ...mapState({
      message: (state: any) => state.msg,
    }),
  },
})
export default class About extends Vue {
  techLists = [
    "Browser Geolocation API",
    "Google Maps Geocoding API",
    "Central Weather Bureau API",
  ];
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style";

.about {
  background: $clear-bg;
  font-family: "Oswald", sans-serif;
  color: $clear-text;
  @apply w-full h-full flex flex-col justify-center items-center;
  h1 {
    color: #ffffff;
  }
}
</style>

