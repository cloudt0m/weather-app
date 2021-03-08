<template>
  <div class="home">
    <location-select
      :locationNames="locationNames"
      :currentLocation="currentLocation"
      @select="getWeatherData($event)"
    ></location-select>
    <template v-if="currentLocation">
      <current-status
        :location="currentLocation"
        :weatherData="currentWeather"
      ></current-status>
    </template>
    <template v-if="weeklyWeather.length > 0">
      <weekly-status :weeklyWeather="weeklyWeather"></weekly-status>
    </template>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LocationSelect from "@/components/LocationSelect.vue";
import CurrentStatus from "@/components/CurrentStatus.vue";
import WeeklyStatus from "@/components/WeeklyStatus.vue";
import axios from "axios";
import moment from "moment";

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
  currentWeather = {
    weather: "",
    temperature: "",
    windSpeed: "",
    precipitationRate: "",
  };
  weeklyWeather: any[] = [];
  latitude = "";
  longitude = "";

  getMyPosition() {
    const apiKey = process.env.VUE_APP_GOOGLE_API_KEY;
    const endpoint = "https://maps.google.com/maps/api/geocode/json";

    const getPositionFromBrowser = (
      options?: PositionOptions
    ): Promise<Position> => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, options);
      });
    };

    getPositionFromBrowser()
      .then((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        axios
          .get(endpoint, {
            params: {
              latlng: `${latitude},${longitude}`,
              language: "zh-TW",
              sensor: true,
              key: apiKey,
            },
          })
          .then((res) => {
            const data = res.data.results;
            const positionData = data.filter((d: any) =>
              d.types.includes("administrative_area_level_1")
            )[0];
            let cityName = positionData.formatted_address.slice(2);

            // convert 台 to 臺
            if (cityName.includes("\u53F0")) {
              cityName = cityName.replace(/\u53F0/, "\u81FA");
            }

            // get weather data from geolocation when no location selected
            if (this.currentLocation == "") {
              this.getWeatherData(cityName);
              this.currentLocation = cityName;
            }
          })
          .catch((error) => console.error(`google geo api error: ${error}`));
      })
      .catch((error) => console.error(`geolocation error: ${error}`));
  }

  getWeatherData(location: string) {
    const apiKey = process.env.VUE_APP_CWB_API_KEY;
    const endpoint =
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091";
    const elementNames = ["T", "WS", "PoP12h", "Wx"];
    const filterItem = (data: Array<any>, fieldName: string) => {
      const fieldData = data.filter((el) => el.elementName == fieldName)[0]
        .time[0].elementValue[0].value;
      return fieldData;
    };
    const filterWeeklyItems = (data: Array<any>, elementNames: string[]) => {
      const today = moment().format("MM/DD");
      const fieldData = elementNames.map((fieldName) => {
        const filteredData: any[] = data
          .filter((el) => el.elementName == fieldName)[0]
          .time.reduce((prev: any, curr: any, index: number, array: any[]) => {
            const time = moment(curr.startTime).format("MM/DD");
            const prevTime = moment(array[index - 1].startTime).format("MM/DD");

            // remove today and duplicate date entry
            if (index > 1) {
              if (time != today && time != prevTime) {
                // push current object to prev array
                return [...prev, curr];
              } else {
                // not push current object
                return prev;
              }
            } else {
              // skip first iteration with undefined prev
              return [];
            }
          })
          .map((el: any) => {
            const obj: any = {};
            obj[fieldName] = el.elementValue[0].value;
            const time = moment(el.startTime).format("MM/DD");
            return {
              time,
              ...obj,
            };
          });
        return filteredData;
      });
      const groupedData = fieldData.reduce((prev, curr) => {
        const combined = prev.map((prevItem, index) => {
          return { ...prevItem, ...curr[index] };
        });
        return combined;
      });
      return groupedData;
    };

    this.currentLocation = location;

    axios
      .get(endpoint, {
        params: {
          Authorization: apiKey,
          locationName: location,
          elementName: elementNames.toString(),
        },
      })
      .then((res) => {
        const weatherData =
          res.data.records.locations[0].location[0].weatherElement;
        this.weeklyWeather = filterWeeklyItems(weatherData, elementNames);
        this.currentWeather.weather = filterItem(weatherData, "Wx");
        this.currentWeather.temperature = filterItem(weatherData, "T");
        this.currentWeather.precipitationRate = filterItem(
          weatherData,
          "PoP12h"
        );
        this.currentWeather.windSpeed = filterItem(weatherData, "WS");
      })
      .catch((error) => console.error(`cwb api error: ${error}`));
  }

  mounted() {
    this.getMyPosition();
  }
}
</script>
