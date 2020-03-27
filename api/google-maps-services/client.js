const Client = require("@googlemaps/google-maps-services-js").Client;

module.exports = {
  googleLocation,
  googlePlacePhoto
};

const client = new Client({});
const key = process.env.GCP_KEY;

function googleLocation(googleIds) {
  return client.placeDetails({
    params: {
      place_id: googleIds,
      fields: "name,formatted_address,formatted_phone_number,icon,photos",
      key
    },
    timeout: 1000
  });
}

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
