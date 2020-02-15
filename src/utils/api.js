const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZGhpbGlwa21yIiwiYSI6ImNrNXltN3p1MDJpam0zam41OGd0ODV5aWQifQ.bICTGqMuwrXjcynl_zXAUg&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/633549111090f56a58bbf7bbfda57d82/${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;
  console.log(url);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        precipProbability: body.currently.precipProbability,
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        tempHigh: body.daily.data[0].temperatureHigh,
        tempLow: body.daily.data[0].temperatureLow
      });
    }
  });
};

module.exports = {
  geocode,
  forecast
};
