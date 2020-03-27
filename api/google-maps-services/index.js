const {
  googleLocation,
  googlePlacePhoto
} = require("../google-maps-services/client");

module.exports = {
  googleLocationObject
}

async function getPhotoUrl(ref) {
  const res = await googlePlacePhoto(ref);
  return res.request.res.responseUrl;
};

async function googleLocationObject(location) {
  const res = await googleLocation(location.googleId);
  const loc = res.data.result;
  const photo = await getPhotoUrl(loc.photos[0].photo_reference);
  
  const structuredResponse = {
    id: location.id,
    name: loc.name,
    address: loc.formatted_address,
    phone: loc.formatted_phone_number,
    icon: photo || loc.icon
  };

  return structuredResponse;
};
