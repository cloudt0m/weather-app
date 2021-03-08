<template>
  <div>
    <h1>一週天氣</h1>
    <div v-for="(data, index) in weeklyWeather" :key="index">
      <p>日期：{{ data.time }} 氣象：{{ data.Wx }} 氣溫：{{ data.T }}C</p>
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