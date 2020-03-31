const {
  googleLocation,
  googlePlacePhoto
} = require("../google-maps-services/client");

module.exports = {
  googleLocationObject
};

async function getPhotoUrl(ref) {
  try {
    const res = await googlePlacePhoto(ref);
    return res.request.res.responseUrl;
  } catch (err) {
    return;
  }
}

async function googleLocationObject(location) {
  try {
    const res = await googleLocation(location.googleId);
    const loc = res.data.result;
    if (!loc) return { message: "Invalid googleId provided." };

    let photo;
    if (!!loc.photos) photo = await getPhotoUrl(loc.photos[0].photo_reference);

    const structuredResponse = {
      id: location.id,
      name: loc.name,
      address: loc.formatted_address,
      phone: loc.formatted_phone_number,
      icon: photo || loc.icon
    };

    return structuredResponse;
  } catch (err) {
    return { message: `Error grabbing location info: ${err.message}` };
  }
}
