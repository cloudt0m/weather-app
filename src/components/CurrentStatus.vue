<template>
  <div class="current">
    <img
      class="current-icon"
      src=""
      alt=""
    >
    <div class="current-information">
      <h2 class="current-temperature">{{ weatherData.temperature }} <span v-if="weatherData.temperature">℃</span></h2>
      <h3 class="current-status">{{ weatherData.weather }}</h3>
      <h3 class="current-status">氣象代碼：{{ weatherData.weatherCode }}</h3>
      <p class="current-time">2021年10月30日 周四</p>
      <div class="current-others">
        <p class="current-precipitation">{{ weatherData.precipitationRate }}</p>
        <p class="current-wind-speed">{{ weatherData.windSpeed }} <span v-if="weatherData.windSpeed"> m/s</span></p>
      </div>
    </div>


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

<style scoped lang="scss">
.current {
  &-icon {

  }
  &-information {

  }
  &-temperature {

  }
  &-status {

  }
  &-time {

  }
  &-others {

  }
  &-precipitation {

  }
  &-wind-speed {

  }
}
</style>