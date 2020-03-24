const db = require("../../config/knexConfig");

module.exports = {
  getSavedLocations,
  addSavedLocation,
  removeSavedLocation
};

function getSavedLocations(userId) {
  return db("saved_locations as s")
    .select(["*"])
    .where({ userId })
    .join("locations as l", { "s.locationId": "l.id" });
}

function addSavedLocation(userId, locationId) {
  return db("saved_locations").insert({ userId, locationId });
}

function removeSavedLocation(userId, locationId) {
  return db("save_locations").where({ userId, locationId });
}
