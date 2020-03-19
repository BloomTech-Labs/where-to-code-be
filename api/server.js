// IMPORTS
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require('express-async-errors');

// Importing of Routes
const authRoute = require("./routes/authRoute.js");
const locationsRoute = require("./routes/locationsRoute.js");
const usersRoute = require("./routes/usersRoute.js");
const reviewsRoute = require("./routes/reviewsRoute.js");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const tokenRoute = require("./routes/tokenRoute.js");

// SERVER
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

// ROUTER
server.use("/auth", authRoute);
server.use("/locations", locationsRoute);
server.use("/users", usersRoute);
server.use("/reviews", reviewsRoute);
server.use("/api", routes);

server.use("/tokenRoute", tokenRoute);

// HOMEPAGE ROUTING
server.get("/", async (req, res) => {
  res.status(200).json({ message: "WhereToCode Server Is Working" });
});

// ERROR HANDLER
server.use(errorHandler);

// EXPORTS
module.exports = server;
