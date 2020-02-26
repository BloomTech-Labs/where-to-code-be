// IMPORTS
const USERS_MODEL = require("../models/UsersModel");
const USER_CREDS = require("../models/UserCredsModel");

const bcrypt = require("bcryptjs");
const signToken = require("../middleware/signToken");

// EXPRESS ROUTER
const router = require("express").Router();

// @route  POST auth/
// @desc   Gets all of the locations in the database
// @access Public
router.post("/register", async (req, res) => {
  if (!req.body) {
    return res.status(500).json({ msg: "Nothing in req.body" });
  }
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 8);

  try {
    const [addedUser] = await USER_CREDS.add(user);
    const {password, ...userInfo} = addedUser;
    return res.status(201).json({
      message: "User added",
      user: {
        ...userInfo,
        token: signToken(userInfo)
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding user." });
  }
});

// Middleware
function checkRegisterCreds(req, res, next) {
  if (!req.body) {
    return res.status(401).json({ message: "Request sent was empty." });
  }

  const user = req.body;
  if (!user.username) return res.status(401).json({ message: "Provide a username" });
  if (!user.email) return res.status(401).json({ message: "Provide a email" });
  if (!user.password) return res.status(401).json({ message: "Provide a password" });
  if (!user.firstName) return res.status(401).json({ message: "Provide a first name as firstName." });
  if (!user.lastName) return res.status(401).json({ message: "Provide a last name as lastName" });
}

module.exports = router;
