const router = require("express").Router();
const VISITS = require("../models/UserVisitsModel");
const { formatLocationObject } = require("../google-maps-services");

// MIDDLEWARE
const findLocation = require("../middleware/locations/findLocation");
const addIfDoesNotExist = require("../middleware/locations/addIfDoesNotExist");

// @route  GET /locations/visited
// @desc   Responds with last 5 visited locations
// @access Registered Users
router.get("/", async (req, res) => {
  const userId = res.locals.decodedToken.userId;
  const visited = await VISITS.getRecentlyVisited(userId);
  if (visited.length) {
    const response = await Promise.all(
      visited.map(async (visit) => {
        const loc = await formatLocationObject(visit.location);
        return {
          ...visit,
          location: loc,
        };
      })
    );
    return res.status(200).json(response);
  }
  return res
    .status(200)
    .json({ message: "You haven't visited any locations." });
});

// @route  POST /locations/visited/:locationId
// @desc   Add a visited location to users profile.
// @access Registered Users
router.post("/:locationId", findLocation, addIfDoesNotExist, (req, res) => {
  const { userId } = res.locals.decodedToken;
  const location = res.locals.location;

  location
    ? respond()
    : res
        .status(400)
        .json({ message: "There was an error finding this location." });

  async function respond() {
    const success = await VISITS.addUserVisit(userId, location.id);
    if (success) return res.status(204).end();
    return res.status(400).end();
  }
});

// @route  DELETE /locations/visited/:visitedId
// @desc   Add a visited location to users profile.
// @access Registered Users
router.delete("/:visitId", async (req, res) => {
  const { userId } = res.locals.decodedToken;
  const visitId = req.params.visitId;

  try {
    const [visit] = await VISITS.getVisit(visitId);
    visit.userId === userId
      ? respond()
      : res
          .status(403)
          .json({ message: "You are not allowed to complete this action." });
  } catch (err) {
    return res.status(400).json({ message: "This visit does not exist." });
  }

  async function respond() {
    const success = await VISITS.removeUserVisit(visitId);
    if (success) return res.status(204).end();
    return res.status(400).end();
  }
});

module.exports = router;
