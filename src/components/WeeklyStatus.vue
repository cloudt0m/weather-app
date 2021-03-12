<template>
  <div class="weekly">
    <template
      v-for="(data, index) in weeklyWeather"
      :key="index"
    >
      <div
        v-if="data.time != currentTime"
        class="weekly-item"
        @click="pickDate(data.time)"
      >
        <div class="weekly-item__time">{{ formatDate(data.time) }}</div>
        <div class="weekly-item__weather-icon">
          <img
            :src="'images/icons/status-' + data.weatherCode + '.svg'"
            class="w-16 h-16"
            alt=""
          >
        </div>
        <div class="weekly-item__temperature">
          <p class="temperature-amount">{{ data.temperature }}</p>
          <div class="temperature-unit">℃</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { WeeklyWeather } from "@/types";
import moment from "moment";
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    weeklyWeather: {
      default: [],
      type: Array,
    },
  },
  emits: ["pickDate"],
})
export default class WeeklyStatus extends Vue {
  weeklyWeather: WeeklyWeather[] = [];
  currentTime = "";

  pickDate(date: string) {
    this.currentTime = date;
    this.$emit("pickDate", date);
  }

  formatDate(date: string): string {
    return moment(date).format("MM/DD");
  }

  mounted() {
    this.currentTime = this.weeklyWeather[0].time;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style";

.weekly {
  min-height: 12rem;
  @apply relative flex md:flex-col md:min-h-full w-full md:w-auto h-1/3 md:h-full;
}
.weekly-item {
  background-color: $clear-block;
  color: $clear-text;
  border-color: $clear-bg;
  @apply flex flex-col md:flex-row flex-1 py-6 md:py-0 md:px-6 border-l-2 border-r-2 md:border-l-0 md:border-r-0 md:border-t-2 md:border-b-2 md:items-center md:justify-between h-full cursor-pointer;
  &__time {
    font-family: "Oswald", sans-serif;
    @apply text-center text-lg font-light;
  }
  &__temperature {
    font-family: "Oswald", sans-serif;
    @apply flex flex-col md:flex-row md:items-end;
    > * {
      @apply text-center;
    }
  }
  &__weather-icon {
    @apply flex justify-center items-center h-1/2 md:w-24;
  }
  .temperature-amount {
    @apply text-4xl font-normal;
  }
}
</style>