<template>
  <div class="location-select__wrapper">
    <div
      class="location-select"
      v-if="!$store.state.isLoading"
    >
      <select
        :value="currentLocation"
        @change="selectLocation($event.target.value)"
      >
        <option
          disabled
          selected
          value=""
        >請選擇</option>
        <option
          v-for="(location, index) in locationNames"
          :key="index"
          :value="location"
        >{{ location }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    locationNames: Array,
    currentLocation: String,
  },
  emits: ["select"],
})
export default class LocationSelect extends Vue {
  currentLocation!: string;
  selectedLocation = "";

  selectLocation(location: string) {
    this.selectedLocation = location;
    this.$emit("select", location);
  }

  mounted() {
    this.selectedLocation = this.currentLocation;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/style";

.location-select {
  position: relative;
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  &__wrapper {
    @apply w-full absolute flex justify-end md:justify-center p-6;
  }
  select {
    grid-area: select;
    color: $clear-text;
    @apply appearance-none bg-transparent border-transparent m-0 py-1 pl-1 pr-6 outline-none cursor-pointer text-xl font-medium;
  }
  &::after {
    content: "";
    width: 0.8rem;
    height: 0.5rem;
    background-color: $clear-text;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
    justify-self: end;
  }
}
</style>