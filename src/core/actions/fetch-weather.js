module.exports = ({ weatherService, locationService }) =>
  async ({ location }) => {
    const locations = await locationService({ location });
    // const weatherForecasts = await Promise.all(locations.map(fetchedLocation => weatherService(fetchedLocation)));
    const weatherForecasts = await Promise.all(locations.map(async fetchedLocation => {
      const weather = await weatherService(fetchedLocation);
      fetchedLocation.currentWeatherForecast = weather.current;
      return fetchedLocation;
    }));
    return weatherForecasts;
  }
