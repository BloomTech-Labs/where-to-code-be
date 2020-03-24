const SAVED = require("../models/SavedLocationsModel");
const router = require("express").Router();
const authenticate = require("../middleware/authenticate.js");

router.use(authenticate);

// @route  /locations/save/:locationId
// @desc   Add a location to users saved locations
// @access Basic Users
router.post("/:id", async (req, res) => {
  const userId = res.locals.decodesJwt.userId;
  const locationId = req.params.id;
  const success = await SAVED.addSavedLocation(userId, locationId);
  !!success
    ? res.status(201).json({ message: "Location saved." })
    : res.status(500).json({ message: "Internal Server Error." });
});

module.exports = router;
