const router = require("express").Router();
const SAVED = require("../models/SavedLocationsModel");

// MIDDLEWARE
const findLocation = require("../middleware/locations/findLocation");
const addIfDoesNotExist = require("../middleware/locations/addIfDoesNotExist");
const { formatAllLocationObjects } = require("../google-maps-services/index");

// @route  GET /locations/saved/
// @desc   Retrieve a users saved locations
// @access Basic Users
router.get("/", async (req, res) => {
  const respond = async (locationsList) => {
    const locations = await formatAllLocationObjects(locationsList); // Restructure the array location objects
    return res.status(200).json(locations);
  };

  const userId = res.locals.decodedToken.userId;
  const locations = await SAVED.getSavedLocations(userId);
  locations.length ? respond(locations) : res.status(204).end();
});

// @route  POST /locations/saved/:locationId
// @desc   Add a location to users saved locations
// @access Basic Users
router.post(
  "/:locationId",
  findLocation,
  addIfDoesNotExist,
  async (req, res) => {
    const userId = res.locals.decodedToken.userId;
    const locationId = res.locals.location.id;
    const success = await SAVED.addSavedLocation(userId, locationId);
    !!success ? res.status(204).end() : res.status(400).end();
  }
);

// @route  DELETE /locations/saved/:locationId
// @desc   Remove a location from users saved list
// @access Basic Users
router.delete("/:locationId", findLocation, async (req, res) => {
  const userId = res.locals.decodedToken.userId;
  const locationId = res.locals.location.id;
  const success = await SAVED.removeSavedLocation(userId, locationId);
  !!success ? res.status(204).end() : res.status(400).end();
});

module.exports = router;
