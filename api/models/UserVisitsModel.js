const db = require("../../config/knexConfig");
const NestHydrationJS = require("nesthydrationjs")();

module.exports = {
  getVisit,
  getRecentlyVisited,
  addUserVisit,
  removeUserVisit,
};

function getVisit(visitId) {
  return db("user_visits as u").where({ "u.id": visitId });
}

function getRecentlyVisited(userId) {
  return db("user_visits as u")
    .where({ "u.userId": userId })
    .join("locations as l", { "u.locationId": "l.id" })
    .select([
      "u.id as id",
      "l.id as location_id",
      "l.googleId as location_googleId",
      "l.name as location_name",
      "l.address as location_address",
      "l.phone as location_phone",
      "l.icon as location_icon",
      "u.timestamp as timestamp",
    ])
    .orderBy("u.timestamp", "desc")
    .then((results) => {
      const dataModel = [
        {
          id: "id",
          timestamp: "timestamp",
          location: {
            id: "location_id",
            googleId: "location_googleId",
            name: "location_name",
            address: "location_address",
            phone: "location_phone",
            icon: "location_icon",
          },
        },
      ];
      return NestHydrationJS.nest(results, dataModel);
    });
}

function addUserVisit(userId, locationId) {
  return db("user_visits").insert({ userId, locationId });
}

function removeUserVisit(visitId) {
  return db("user_visits").where({ id: visitId }).del();
}
