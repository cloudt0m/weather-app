<template>
  <div class="home">
    <location-select
      :locationNames="locationNames"
      :currentLocation="currentLocation"
      @select="getLocation($event); getWeatherData(currentLocation)"
    ></location-select>
    <p>地區：{{ currentLocation }}</p>
    <p>天氣：{{ weather }}</p>
    <p>最高溫度：{{ maxTemperature }}</p>
    <p>最低溫度：{{ minTemperature }}</p>
    <p>降雨機率：{{ precipitationRate }}</p>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LocationSelect from "@/components/LocationSelect.vue";
import axios from "axios";

@Options({
  data() {
    return {
      locationNames: [
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
      ],
      currentLocation: "",
      weather: "",
      maxTemperature: "",
      minTemperature: "",
      precipitationRate: "",
      latitude: "",
      longitude: "",
    };
  },
  methods: {
    getLocation(location: string) {
      this.currentLocation = location;
    },
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

              this.getWeatherData(cityName);
            })
            .catch((error) => console.error(`google geo api error: ${error}`));
        })
        .catch((error) => console.error(`geolocation error: ${error}`));
    },
    getWeatherData(location: string) {
      const apiKey = process.env.VUE_APP_CWB_API_KEY;
      const endpoint =
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091";
      const elementNames = ["MaxT", "MinT", "PoP12h", "Wx"];

      const filterItem = (data: Array<any>, fieldName: string) => {
        const fieldData = data.filter((el) => el.elementName == fieldName)[0]
          .time[0].elementValue[0].value;
        return fieldData;
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

          this.weather = filterItem(weatherData, "Wx");
          this.precipitationRate = filterItem(weatherData, "PoP12h") + "%";
          this.maxTemperature = filterItem(weatherData, "MaxT") + "C";
          this.minTemperature = filterItem(weatherData, "MinT") + "C";
        })
        .catch((error) => console.error(`cwb api error: ${error}`));
    },
  },
  components: {
    LocationSelect,
  },
  mounted: function () {
    this.getMyPosition();
  },
})
export default class Home extends Vue {}
</script>
