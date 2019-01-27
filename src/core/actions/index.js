const fetchWeather     = require('./fetch-weather');
const locationServices = require('../infrastructure/services/location');
const weatherServices  = require('../infrastructure/services/weather');
const config           = require('config');

module.exports = ({ locationProvider = 'mapQuest', weatherProvider = 'forecastIo' }) => {
  if(!locationServices[locationProvider]) throw new Error(`weather service not found. Supported weather services: ${Object.keys(locationServices)}`);
  if(!weatherServices[weatherProvider]) throw new Error(`location service not found. Supported location services: ${Object.keys(weatherServices)}`);

  const weatherService = weatherServices[weatherProvider]({ token: config.get(`weatherClients.${weatherProvider}.token`) });
  const locationService = locationServices[locationProvider]({ token: config.get(`locationClients.${locationProvider}.token`) });
  return fetchWeather({ locationService: locationService, weatherService: weatherService });
}