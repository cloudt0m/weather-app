<template>
  <div>
    <h1>一週天氣</h1>
    <div v-for="(data, index) in weeklyWeather" :key="index">
      <p>日期：{{ data.time }} 溫度：{{ data.T }}C 風速：{{ data.WS }}m/s 降雨機率：{{ data.PoP12h }}</p>
    </div>

  </div>
</template>

<script lang="ts">
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
  weeklyWeather: any[] = [];
}
</script>

<style scoped>
</style>