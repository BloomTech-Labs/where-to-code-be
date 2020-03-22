// IMPORTS
const LOCATIONS_MODEL = require("../models/LocationsModel.js");
const requireBody = require("../middleware/requireBody");
const authenticate = require("../middleware/authenticate.js");

// EXPRESS ROUTER
const router = require("express").Router();

// @route  GET locations/
// @desc   Gets all of the locations in the database
// @access Public
router.get("/", async (req, res) => {
  try {
    let result = await LOCATIONS_MODEL.getAll_locations();
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/:fbid", async (req, res) => {
  const { fbid } = req.params;
  try {
    let result = await LOCATIONS_MODEL.getLocationByGoogleId(fbid);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
});

router.post("/", requireBody, async (req, res) => {
  let location = req.body;
  try {
    if (!!location.googleId) {
      const loc = await LOCATIONS_MODEL.add({ googleId: location.googleId });
      return res.status(201).json(loc);
    }
    const addedLocation = await LOCATIONS_MODEL.add(location);
    return res.status(201).json(addedLocation);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

// - POST - //
// - PUT - //
// - DEL - //

// EXPORTS
module.exports = router;
