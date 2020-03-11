// IMPORTS
const USERS_MODEL = require("../models/UsersModel");
const USER_CREDS = require("../models/UserCredsModel");

const bcrypt = require("bcryptjs");
const signToken = require("../middleware/signToken");
const authenticate = require("../middleware/authenticate");

// EXPRESS ROUTER
const router = require("express").Router();

// @route  POST /auth/login
// @desc   A user sends their email & password to gain a jwt
// @access Public
router.post("/login", async (req, res) => {
  const {email, password} = req.body;
  try {
    const [user] = await USER_CREDS.findBy({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const [userInfo] = await USERS_MODEL.getUserInfo(user.id);
      return res.status(200).json({ ...userInfo, token: signToken(user)});
    }
    return res.status(401).json({ message: "Invalid credentials." });
  } catch(error) {
    return res.status(500).json({ message: "Unable to login user" });
  }
});

// @route  POST /auth/user/register
// @desc   Allows a basic user to register
// @access Public
router.post("/user/register", checkRegisterCreds, async (req, res) => {
  const userCreds = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: "user"
  };

  const userInfo = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  };

    const [addedUserCreds] = await USER_CREDS.add(userCreds); // add user credentials to user_creds table
    const {password, ...userCredsRest} = addedUserCreds; // remove password from response object

    const [addedUserInfo] = await USERS_MODEL.add({ id: userCredsRest.id, ...userInfo }); // add users information to users table

    return res.status(201).json({
      ...addedUserInfo,
      email: userCreds.email,
      token: signToken(userCredsRest)
    });
});

router.use(authenticate);

// @route  GET /auth/info
// @desc   Get a users information for the dashboard
// @access Restricted
router.get('/info', async (req, res) => {
  const { userId } = res.locals.decodedToken;
  const [user] = await USERS_MODEL.getUserInfo(userId);
  return res.status(200).json(user);
});

// @route  PUT /auth/update
// @desc   Updates a users account
// @access Restricted
router.put("/update", async (req, res) => {
  const updateTo = req.body;
  if (!Object.keys(updateTo).length || updateTo.id) return res.status(401).json({ message: "No changes provided." });
  const { userId } = res.locals.decodedToken;
  try {
    if (updateTo.password) updateTo.password = bcrypt.hashSync(updateTo.password, 8);
    const [updatedUserCreds] = await USER_CREDS.update(userId, updateTo);
    if (updatedUserCreds) return res.status(204).end();
    else res.status(401).end();
  } 
  catch(err) {
    return res.status(401).json({ message: "Unable to update user", error: err.message });
  }
});

// @route  /users/delete
// @desc   Allows a user to delete their account
// @access Restricted
router.delete("/delete-account", async (req, res) => {
  const id = res.locals.decodedToken.userId;
  const success = await USER_CREDS.remove(id);
  console.log('success: ', success);
  if (!success) return res.status(500).json({ message: "Unable to remove user from database." });
  return res.status(204).end();
});

// Middleware
function checkRegisterCreds(req, res, next) {
  if (!Object.keys(req.body).length) {
    return res.status(401).json({ message: "Request sent was empty." });
  }

  const user = req.body;
  if (!user.username) return res.status(401).json({ message: "Provide a username" });
  if (!user.email) return res.status(401).json({ message: "Provide a email" });
  if (!user.password) return res.status(401).json({ message: "Provide a password" });
  if (!user.firstName) return res.status(401).json({ message: "Provide a first name as firstName." });
  if (!user.lastName) return res.status(401).json({ message: "Provide a last name as lastName" });
  next();
}

module.exports = router;
