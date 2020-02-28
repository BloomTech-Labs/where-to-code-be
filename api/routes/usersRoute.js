// IMPORTS
const USERS_MODEL = require("../models/UsersModel");

const authenticate = require("../middleware/authenticate");

// EXPRESS ROUTER
const router = require("express").Router();

// @route  GET users/
// @desc   Gets all of the users in the database
// @access Public
router.get("/", async (req, res) => {
  try {
    const allUsers = await USERS_MODEL.getAll_users();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

// @route  GET users/:userid
// @desc   Gets a specific user from the database
// @access Public
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [specifiedUser] = await USERS_MODEL.getUserById(id);
    res.status(200).json(specifiedUser);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

router.use(authenticate);

// @route  PUT /users/update
// @desc   Gets a specific user from the database
// @access Public
router.put("/update", async (req, res) => {
  const id = res.locals.decodedToken.userId;
  const [updated] = await USERS_MODEL.update(id, req.body);
  if (updated) {
    return res.status(204).end();
  } else return res.status(401).end();
});

module.exports = router;
