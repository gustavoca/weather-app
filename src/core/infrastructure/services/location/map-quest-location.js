const MAP_QUEST_URL         = 'http://www.mapquestapi.com/geocoding/v1/address?';
const QUERY_STRING_KEY      = 'key';
const QUERY_STRING_LOCATION = 'location';
const Location              = require('../../../model/location');
const request               = require('request-promise');

module.exports = ({ token }) =>
  async ({ location }) => {
    location = encodeURIComponent(location);
    try {
      const result = await request({
        url : `${MAP_QUEST_URL}${QUERY_STRING_KEY}=${token}&${QUERY_STRING_LOCATION}=${location}`,
        json: true
      });
      const locations = result.results[0].locations.map(fetchedLocation => {
        return new Location({
          city     : fetchedLocation.adminArea5,
          state    : fetchedLocation.adminArea3,
          latitude : fetchedLocation.latLng.lat,
          longitude: fetchedLocation.latLng.lng,
          country  : fetchedLocation.adminArea1
        });
      });
      return locations;
    }
    catch(e) {
      throw new Error(`MapQuest => ${e.message}`);
    }
  }