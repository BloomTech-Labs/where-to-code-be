const db = require("../../config/knexConfig");

module.exports = {
  getRecentlyVisited,
  addUserVisit,
  removeUserVisit,
};

function getRecentlyVisited(userId) {
  return db("users_visits as u")
    .where({ "u.userId": userId })
    .join("locations as l")
    .select([
      "u.id as _id",
      "l.id as _location_id",
      "l.googleId as _location_googleId",
      "l.name as _location_name",
      "l.address as _location_address",
      "l.phone as _location_phone",
      "l.icon as _location_icon",
      "u.timestamp as _timestamp",
    ])
    .orderBy("u.timestamp", "desc");
}

function addUserVisit(userId, locationId) {
  return db("users_visits").insert({ userId, locationId });
}

function removeUserVisit(visitId) {
  return db("users_visits").where({ id: visitId }).del();
}
