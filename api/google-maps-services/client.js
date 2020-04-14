const Client = require("@googlemaps/google-maps-services-js").Client;

module.exports = {
  googleLocation,
  googlePlacePhoto
};

const client = new Client({});
const key = process.env.GCP_KEY;

// googleLocation takes a Google Place Id and returns a promise
function googleLocation(googleId) {
  return client.placeDetails({
    params: {
      place_id: googleId,
      fields: "name,formatted_address,formatted_phone_number,icon,photos",
      key
    },
    timeout: 1000
  });
}

// googlePlacePhoto takes a reference Id and returns a promise
function googlePlacePhoto(photoreference) {
  return client.placePhoto({
    params: {
      photoreference,
      maxwidth: 300,
      key
    },
    timeout: 1000
  });
}
