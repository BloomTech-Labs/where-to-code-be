// IMPORTS
const LOCATIONS_MODEL = require("../models/LocationsModel.js");
const requireBody = require("../middleware/requireBody");
const authenticate = require("../middleware/authenticate.js");

// EXPRESS ROUTER
const router = require("express").Router();

// @route  GET /locations/
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

// @route  GET /locations/:id
// @desc   Gets a single location based on id || googleId
// @access Public
router.get("/:id", findLocation, (req, res) => {
  !!res.locals.location
    ? res.status(200).json(res.locals.location)
    : res.status(404).json({ message: "Location not found." });
});

// @route  POST /locations/
// @desc   Add a location to the database
// @access Public
router.post(
  "/",
  requireBody,
  findLocation,
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
function findLocation(req, res, next) {
  let location = req.body;
  if (!!req.params.id)
    location = { id: req.params.id, googleId: req.params.id };

  const findBy = id => {
    if (location[id])
      return LOCATIONS_MODEL.getLocationBy({ [id]: location[id] }); // if location object has id, return getLocationBy(id)
    return new Promise(resolve => resolve([])); // else return an empty array
  };

  const assign = location => {
    res.locals.location = location; // assign found location to res.locals for use in request
    return next();
  };

  findBy("googleId").then(loc => {
    if (loc.length) assign(loc[0]);
    else
      findBy("id").then(loc => {
        if (loc.length) assign(loc[0]);
        else
          findBy("address").then(loc => {
            if (loc.length) assign(loc[0]);
            return next();
          });
      });
  });
}

function verifyLocationKeys(req, res, next) {
  const location = req.body;
  if (!!location.googleId) return next(); // skip check if object contains googleId
  const keys = ["name", "address", "phone"];
  keys.forEach(key => {
    if (!Object.keys(location).includes(key))
      return res.status(401).json({ message: `Missing location key: ${key}` });
  });
  next();
}

// EXPORTS
module.exports = router;
