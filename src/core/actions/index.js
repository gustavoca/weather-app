const fetchWeather     = require('./fetch-weather');
const locationServices = require('../infrastructure/services/location');
const weatherServices  = require('../infrastructure/services/weather');

module.exports = ({ locationProvider = 'mapQuest', weatherProvider = 'forecastIo' }) => {
  if(!locationServices[locationProvider]) throw new Error(`weather service not found. Supported weather services: ${Object.keys(locationServices)}`);
  return fetchWeather({ locationService: locationServices[locationProvider], weatherService: weatherServices[weatherProvider] });
}