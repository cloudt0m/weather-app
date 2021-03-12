import {
  CWBData,
  WeeklyWeather,
  PositionData,
  CWBTime
} from '@/types';
import axios from 'axios';
import moment from 'moment';

export default {
  getMyPosition(): Promise<string> {
    const apiKey = process.env.VUE_APP_GOOGLE_API_KEY;
    const endpoint = 'https://maps.google.com/maps/api/geocode/json';
    const getPositionFromBrowser = (
      options?: PositionOptions
    ): Promise<Position> => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, options);
      });
    };
    return getPositionFromBrowser()
      .then((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        return axios
          .get(endpoint, {
            params: {
              latlng: `${latitude},${longitude}`,
              language: 'zh-TW',
              sensor: true,
              key: apiKey,
            },
          })
          .then((res) => {
            const data = res.data.results;
            const positionData = data.filter((d: PositionData) =>
              d.types.includes('administrative_area_level_1')
            )[0];
            let cityName = positionData.formatted_address.slice(2);

            // convert 台 to 臺
            if (cityName.includes('\u53F0')) {
              cityName = cityName.replace(/\u53F0/, '\u81FA');
            }
            return cityName;
          })
          .catch((error) => console.error(`google geo api error: ${error}`));
      })
      .catch((error) => console.error(`geolocation error: ${error}`));
  },

  getWeatherData(location: string): Promise<WeeklyWeather[]> {
    const apiKey = process.env.VUE_APP_CWB_API_KEY;
    const endpoint =
      'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091';
    const elementNames = ['T', 'WS', 'PoP12h', 'Wx'];
    const filterWeeklyItems = (
      data: Array<CWBData>,
      elementNames: string[]
    ) => {
      const fieldData = elementNames.map((fieldName) => {
        const filteredData: WeeklyWeather[] = data
          .filter((el) => el.elementName == fieldName)[0]
          .time.filter((el: CWBTime, index: number, array: CWBTime[]) => {
            const time = moment(el.startTime).format('YYYY-MM-DD');

            // remove today and duplicate date entry
            if (index > 0) {
              const prevTime = moment(array[index - 1].startTime).format(
                'YYYY-MM-DD'
              );
              if (time != prevTime) {
                // push current object to prev array
                return true;
              } else {
                // not push current object
                return false;
              }
            } else {
              // skip first iteration with undefined prevTime
              return true;
            }
          })
          .map((el: CWBTime) => {
            const obj: { [key: string]: string } = {};
            const time = moment(el.startTime).format('YYYY-MM-DD');
            const value = el.elementValue[0].value;
            
            switch (fieldName) {
              case 'T':
                obj.temperature = value;
                break;
              case 'WS':
                obj.windSpeed = value;
                break;
              case 'PoP12h':
                obj.precipitationRate = value;
                break;
              case 'Wx':
                obj.weather = el.elementValue[0].value;
                obj.weatherCode = el.elementValue[1].value;
                break;
              default:
                obj[fieldName] = value;
                break;
            }

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

    return axios
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
        const weeklyWeather = filterWeeklyItems(weatherData, elementNames);
        return weeklyWeather;
      });
  },
};
