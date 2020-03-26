const router = require("express").Router();
const SAVED = require("../models/SavedLocationsModel");

const authenticate = require("../middleware/authenticate.js");
const findLocation = require("../middleware/locations/findLocation");

router.use(authenticate);

// @route  /locations/save/:locationId
// @desc   Add a location to users saved locations
// @access Basic Users
router.post("/:id", findLocation, async (req, res) => {
  const userId = res.locals.decodedToken.userId;
  const locationId = res.locals.location.id;
  const success = await SAVED.addSavedLocation(userId, locationId);
  !!success
    ? res.status(201).json({ message: "Location saved." })
    : res.status(500).json({ message: "Internal Server Error." });
});

module.exports = router;
