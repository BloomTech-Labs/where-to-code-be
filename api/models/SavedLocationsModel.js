const db = require("../../config/knexConfig");

module.exports = {
  getSavedLocations,
  addSavedLocation,
  removeSavedLocation
};

function getSavedLocations(userId) {
  return db("saved_locations as s")
    .select([
      "l.id",
      "l.googleId",
      "l.name",
      "l.address",
      "l.phone",
      "l.icon"
    ])
    .where({ userId })
    .join("locations as l", { "s.locationId": "l.id" });
}

function addSavedLocation(userId, locationId) {
  return db("saved_locations").insert({ userId, locationId });
}

function removeSavedLocation(userId, locationId) {
  return db("saved_locations").where({ userId, locationId }).del();
}
