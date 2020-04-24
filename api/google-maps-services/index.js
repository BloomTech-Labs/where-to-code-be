const {
  googleLocation,
  googlePlacePhoto,
} = require("../google-maps-services/client");

module.exports = {
  formatLocationObject,
  formatAllLocationObjects,
};

async function getPhotoUrl(ref) {
  try {
    const res = await googlePlacePhoto(ref);
    return res.request.res.responseUrl;
  } catch (err) {
    return;
  }
}

/*
  googleLocationObject takes in a location object, from our database,
  and builds a response using details from Google Places API
*/
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
      icon: photo || loc.icon,
    };

    return structuredResponse;
  } catch (err) {
    return { message: `Error grabbing location info: ${err.message}` };
  }
}

async function formatLocationObject(location) {
  let formatted = {
    id: location.id,
    name: location.name,
    address: location.address,
    phone: location.phone,
    icon: location.icon,
  };
  if (!!location.googleId) {
    formatted = await googleLocationObject(location);
    formatted.googleId = location.googleId;
  }
  return formatted;
}

async function formatAllLocationObjects(locationsList) {
  return await Promise.all(
    locationsList.map(async (l) => {
      return await formatLocationObject(l);
    })
  ).then((locations) => {
    return locations;
  });
}
