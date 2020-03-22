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

router.post(
  "/",
  requireBody,
  checkIfLocationExists,
  verifyLocationKeys,
  async (req, res) => {
    if (!!res.locals.location)
      return res.status(200).json({
        message: "Location already in database.",
        ...res.locals.location
      });

    let location = req.body;
    if (!!location.googleId) location = { googleId: location.googleId };
    const [loc] = await LOCATIONS_MODEL.addLocation(location);
    return res.status(201).json(loc);
  }
);

// - PUT - //
// - DEL - //

// MIDDLEWARE
function checkIfLocationExists(req, res, next) {
  const location = req.body;
  const findBy = async id => {
    const [loc] = await LOCATIONS_MODEL.getLocationBy({ [id]: location[id] });
    if (!!loc) res.locals.location = loc;
    next();
  };
  if (!!location.googleId) findBy("googleId");
  else findBy("address");
}

function verifyLocationKeys(req, res, next) {
  const location = req.body;
  if (!!location.googleId) next();
  const keys = ["name", "address", "phone"];
  keys.forEach(key => {
    if (!Object.keys(location).includes(key))
      return res.status(401).json({ message: `Missing location key: ${key}` });
  });
  next();
}

// EXPORTS
module.exports = router;
