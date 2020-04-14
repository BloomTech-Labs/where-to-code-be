// IMPORTS
const JWT = require("jsonwebtoken");

// FUNCTION
const sign_JWT = (user) => {
  // Payload
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role
  }
  // Options
  const options = {
    expiresIn: "1d"
  };
  // Sign Token
  return JWT.sign(payload, process.env.JWT_SECRET, options);
};
module.exports = sign_JWT;
