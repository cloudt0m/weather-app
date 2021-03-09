<template>
  <div>
    <h1>一週天氣</h1>
    <div v-for="(data, index) in weeklyWeather" :key="index">
      <p>日期：{{ data.time }} 氣象：{{ data.weather }} 氣溫：{{ data.temperature }}℃</p>
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

<style scoped>
</style>