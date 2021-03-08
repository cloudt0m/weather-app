<template>
  <div>
    <p>地區：{{ location }}</p>
    <p>天氣：{{ weatherData.weather.Wx }}</p>
    <p>溫度：{{ weatherData.temperature }} <span v-if="weatherData.temperature">℃</span></p>
    <p>降雨機率：{{ weatherData.precipitationRate }} <span v-if="weatherData.precipitationRate"> %</span></p>
    <p>風速：{{ weatherData.windSpeed }} <span v-if="weatherData.windSpeed"> m/s</span></p>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    location: {
      default: "",
      type: String,
    },
    weatherData: {
      weather: {
        default: "",
        type: String,
      },
      temperature: {
        default: null,
        type: Number,
      },
      precipitationRate: {
        default: null,
        type: Number,
      },
      windSpeed: {
        default: null,
        type: Number,
      },
    },
  },
})
export default class CurrentStatus extends Vue {
  location!: string;
}
</script>

<style scoped>
</style>