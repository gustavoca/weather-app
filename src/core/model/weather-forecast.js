class WeatherForecast {
  constructor({ time, description, temperature, apparentTemperature }) {
    this.time = time;
    this.description = description;
    this.temperature = temperature;
    this.apparentTemperature = apparentTemperature;
  }
}

module.exports = WeatherForecast;
