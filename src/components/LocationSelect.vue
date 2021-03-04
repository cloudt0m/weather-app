<template>
  <div>
    <select
      :value="currentLocation"
      @change="selectLocation($event.target.value)"
      class="location-select"
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
    已選擇 {{ currentLocation }}
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
</style>