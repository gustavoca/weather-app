class Location {
  constructor({ country, latitude, longitude, currentWeatherForecast, city }) {
    this.country                = country;
    this.latitude               = latitude;
    this.longitude              = longitude;
    this.currentWeatherForecast = currentWeatherForecast;
    this.city                   = city;
  }
}

module.exports = Location;