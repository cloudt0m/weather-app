<template>
  <div class="home">
    <location-select
      :locationNames="locationNames"
      :currentLocation="currentLocation"
      @select="reloadWeatherData($event)"
    ></location-select>
    <template v-if="weeklyWeather.length > 0">
      <current-status
        :location="currentLocation"
        :weatherData="currentWeather"
      ></current-status>
      <weekly-status
        :weeklyWeather="weeklyWeather"
        @pickDate="filterDataByDate($event)"
      ></weekly-status>
    </template>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LocationSelect from "@/components/LocationSelect.vue";
import CurrentStatus from "@/components/CurrentStatus.vue";
import WeeklyStatus from "@/components/WeeklyStatus.vue";
import WeatherService from "@/services/WeatherService";
import { WeeklyWeather } from "@/types";

@Options({
  components: {
    LocationSelect,
    CurrentStatus,
    WeeklyStatus,
  },
})
export default class Home extends Vue {
  locationNames = [
    "宜蘭縣",
    "花蓮縣",
    "臺東縣",
    "澎湖縣",
    "金門縣",
    "連江縣",
    "臺北市",
    "新北市",
    "桃園市",
    "臺中市",
    "臺南市",
    "高雄市",
    "基隆市",
    "新竹縣",
    "新竹市",
    "苗栗縣",
    "彰化縣",
    "南投縣",
    "雲林縣",
    "嘉義縣",
    "嘉義市",
    "屏東縣",
  ];
  currentLocation = "";
  currentWeather: WeeklyWeather = {
    time: "",
    weather: "",
    weatherCode: "",
    temperature: "",
    windSpeed: "",
    precipitationRate: "",
  };
  weeklyWeather: WeeklyWeather[] = [];

  reloadWeatherData(location: string) {
    this.currentLocation = location;
    WeatherService.getWeatherData(location).then((data) => {
      this.currentWeather = data[0];
      this.weeklyWeather = data;
      this.$store.state.isLoading = false;
    });
  }

  filterDataByDate(date: string) {
    this.currentWeather = this.weeklyWeather.filter((el) => el.time == date)[0];
  }

  mounted() {
    this.$store.state.isLoading = true;
    const position = WeatherService.getMyPosition();
    position.then((position) => {
      this.reloadWeatherData(position);
    });
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style";

.home {
  background-color: $clear-bg;
  @apply relative w-full h-full flex flex-col md:flex-row md:justify-center;
}
</style>