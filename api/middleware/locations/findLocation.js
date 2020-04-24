const LOCATIONS_MODEL = require("../../models/LocationsModel");

module.exports = findLocation;

/*
  When used on a route with `/:id` as a request paramater,
    findLocation() takes the provided id and searches through
    both `location.id` & `location.googleId` for a match

  When used on a route with request body, findLocation() will use
    `id`, `googleId`, & `address` from the req.body to check
    for a match.

  If a match is found, it's location object is passed on through
    `res.locals.location`
*/

function findLocation(req, res, next) {
  let location = req.body;
  if (!!req.params.locationId)
    location = { id: req.params.locationId, googleId: req.params.locationId };

  const findBy = (type) => {
    if (location[type]) {
      if (type === "id" && isNaN(location[type])) { // "id" is expected as an integer
        return new Promise((resolve) => resolve([])); // IF not passed as integer do not call getLocationBy(
      }
      return LOCATIONS_MODEL.getLocationBy({ [type]: location[type] }); // if location object has id, return getLocationBy(id)
    }
    return new Promise((resolve) => resolve([])); // else return an empty array
  };

  const assign = (location) => {
    res.locals.location = location; // assign found location to res.locals for use in request
    return next();
  };

  findBy("googleId").then((loc) => {
    if (loc.length) assign(loc[0]);
    else
      findBy("id").then((loc) => {
        if (loc.length) assign(loc[0]);
        else
          findBy("address").then((loc) => {
            if (loc.length) assign(loc[0]);
            return next();
          });
      });
  });
}
