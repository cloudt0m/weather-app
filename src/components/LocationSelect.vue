<template>
  <div class="w-full absolute flex justify-center p-6">
    <div class="location-select">
      <select
        :value="currentLocation"
        @change="selectLocation($event.target.value)"
        class="text-xl font-medium"
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

  select {
    // A reset of styles, including removing the default dropdown arrow
    appearance: none;
    // Additional resets for further consistency
    background-color: transparent;
    border: transparent;
    margin: 0;
    border-radius: 0.25rem;
    padding: 0.25rem 1.5rem 0.25rem 0.25rem;
     cursor: pointer;
    line-height: 1.1;
    outline: none;
    grid-area: select;
    color: $clear-text;
  }
  &::after {
    content: "";
    width: 0.8rem;
    height: 0.5rem;
    background-color: $clear-text;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    box-sizing: border-box;
    grid-area: select;
    justify-self: end;
  }
}
</style>