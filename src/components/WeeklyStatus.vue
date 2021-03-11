<template>
  <div class="weekly relative flex md:flex-col md:min-h-full w-full md:w-auto h-1/3 md:h-full">
    <div
      v-for="(data, index) in weeklyWeather"
      :key="index"
      class="weekly-item flex flex-col md:flex-row flex-1 py-6 md:py-0 md:px-6 border-l-2 border-r-2 md:border-l-0 md:border-r-0 md:border-t-2 md:border-b-2 md:items-center md:justify-between h-full"
    >
      <div class="weekly-item__time text-center text-lg">{{ data.time }}</div>
      <div class="weekly-item__weather-icon flex justify-center items-center h-1/2 md:w-24">
        <img
          :src="'images/icons/status-' + data.weatherCode + '.svg'"
          class="w-16 h-16"
          alt=""
        >
      </div>
      <div class="weekly-item__temperature text-center text-3xl font-medium">
        <p class="">{{ data.temperature }}</p>
      </div>
      <div class="weekly-item__unit text-center">℃</div>
    </div>
  </div>
</template>

<script lang="ts">
import { WeatherData } from "@/types";
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    weeklyWeather: {
      default: [],
      type: Array,
    },
  },
})
export default class WeeklyStatus extends Vue {
  weeklyWeather: WeatherData[] = [];
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style";

.weekly {
  min-height: 12rem;
}
.weekly-item {
  background-color: $clear-block;
  color: $clear-text;
  border-color: $clear-bg;
}
</style>