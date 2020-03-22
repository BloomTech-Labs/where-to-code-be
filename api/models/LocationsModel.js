const db = require("../../config/knexConfig");

module.exports = {
  getAll_locations,
  getLocationBy,
  addLocation,
  updateLocation,
  deleteLocation
};

function getAll_locations() {
  return db("locations");
}

function getLocationBy(id) {
  return db("locations").where(id);
}

function addLocation(location) {
  return db("locations").insert(location, ["*"]);
}

function updateLocation(id, update) {
  return db("locations")
    .where({ id })
    .update(update, ["*"]);
}

function deleteLocation() {
  return db("locations")
    .where({ id })
    .del();
}
