const yargs = require('yargs');
const fetchWeatherBuilder = require('../core/actions');

const main = async () => {
  const argv = yargs
    .options({
      l: {
        demand  : true,
        alias   : 'location',
        describe: 'Location to fetch weather for.',
        string  : true
      },
      wp: {
        demand  : false,
        alias   : 'weatherProvider',
        describe: 'Weather provider to use. Default: Forecast.io.',
        string  : true
      },
      lp: {
        demand  : false,
        alias   : 'locationProvider',
        describe: 'Location provider to use. Default: MapQuest.',
        string  : true
      }
    })
    .alias('help', 'h')
    .argv;

  try {
    const fetchWeather = fetchWeatherBuilder({ weatherProvider: argv.weatherProvider, locationProvider: argv.locationProvider })
    const weatherForecasts = await fetchWeather({ location: argv.location })
    weatherForecasts.forEach((weatherForecast) => {
      console.log('', weatherForecast);
      console.log('=====================');
    });
  }
  catch(e) {
    console.log(e);
  }
}

main();