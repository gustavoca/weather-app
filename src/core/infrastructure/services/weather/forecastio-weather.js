const request         = require('request-promise');
const FORECAST_IO_URL = 'https://api.darksky.net/forecast';
const Weather         = require('../../../model/weather');
const WeatherForecast = require('../../../model/weather-forecast');

module.exports = ({ token }) =>
  async ({ longitude, latitude }) => {
    try {
      const result = await request({
        url : `${FORECAST_IO_URL}/${token}/${latitude},${longitude}`,
        json: true
      });
      const { currently } = result;
      const currentWeatherForecast = new WeatherForecast({ 
        time               : currently.time,
        description        : currently.summary,
        temperature        : currently.temperature,
        apparentTemperature: currently.apparentTemperature
      });
      const weather = new Weather({ current: currentWeatherForecast });
      // console.log(result.body);
      // process.exit(0);
      return weather;
    }
    catch(e) {
      throw new Error(`Forecastio => ${e.message}`);
      // console.log(e);
      // return [];
    }
  }
