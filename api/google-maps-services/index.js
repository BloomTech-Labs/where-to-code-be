const {
  googleLocation,
  googlePlacePhoto,
} = require("../google-maps-services/client");

module.exports = {
  googleLocationObject,
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

async function formatAllLocationObjects(locationsList) {
  return await Promise.all(
    locationsList.map(async (l) => {
      let location = {
        id: l.id,
        name: l.name,
        address: l.address,
        phone: l.phone,
        icon: l.icon,
      };
      if (!!l.googleId) location = await googleLocationObject(l);

      return location;
    })
  ).then((locations) => {
    return locations;
  });
}
