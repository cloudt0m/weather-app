<template>
  <div class="current flex flex-col md:flex-row justify-center items-center h-2/3 md:h-full w-full px-8 py-16 background-clear">
    <img
      class="current-icon w-80 h-72 md:w-96 md:h-80 p-6 object-contain max-w-xs"
      :src="'images/icons/status-' + weatherData.weatherCode + '.svg'"
      alt=""
    >
    <div class="current-information flex flex-row md:flex-col lg:flex-row">
      <h2 class="current-temperature text-8xl px-4 md:px-0 font-medium">{{ weatherData.temperature }}<span
          v-if="weatherData.temperature"
          class="text-2xl"
        >℃</span></h2>
      <div class="current-other-informations flex flex-col justify-center lg:px-6">
        <h3 class="current-status text-xl font-medium leading-10">{{ weatherData.weather }}</h3>
        <p class="current-time py-1">{{ nowTime }}</p>
        <div class="flex flex-row">
          <div class="current-precipitation flex pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon w-5 h-auto"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 12a8 8 0 0 1 16 0z" />
              <path d="M12 12v6a2 2 0 0 0 4 0" />
            </svg>
            {{ weatherData.precipitationRate }} %
          </div>
          <div class="current-wind-speed flex pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon w-5 h-auto"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
              <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
              <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
            </svg>
            {{ weatherData.windSpeed }} <span v-if="weatherData.windSpeed"> m/s</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import moment from "moment";

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
  nowTime = "";

  mounted() {
    const nowTime = new Date();
    const weekDay = moment(nowTime).weekday();
    let chineseWeekDay;
    switch (weekDay) {
      case 0:
        chineseWeekDay = "週日";
        break;
      case 1:
        chineseWeekDay = "週一";
        break;
      case 2:
        chineseWeekDay = "週二";
        break;
      case 3:
        chineseWeekDay = "週三";
        break;
      case 4:
        chineseWeekDay = "週四";
        break;
      case 5:
        chineseWeekDay = "週五";
        break;
      case 6:
        chineseWeekDay = "週六";
        break;
    }

    this.nowTime = moment(nowTime).format("YYYY年MM月DD日 ") + chineseWeekDay;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/style";

.current {
  color: $clear-text;
  &-precipitation {
    border-color: $clear-text;
    border-right-width: 1px;
  }
}
.icon {
  stroke: $clear-text;
  margin-right: 0.25rem;
}
.background-clear {
  background: url("/images/clear-bg.svg") center bottom no-repeat;
  background-size: contain;
}
</style>