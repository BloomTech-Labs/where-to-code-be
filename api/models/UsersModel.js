const db = require("../../config/knexConfig");

module.exports = {
  getAll_users,
  add,
  getUserById,
  update
};

function getAll_users() {
  return db("users");
};

function add(user) {
  return db("users").insert(user, ['*']);
};

function getUserById(id) {
  return db("users").where({ id })
};

function update(id, changes) {
  return db("users").where({ id }).update(changes, ['*']);
};
