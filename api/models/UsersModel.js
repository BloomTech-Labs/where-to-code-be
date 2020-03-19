const db = require("../../config/knexConfig");

module.exports = {
  getAll_users,
  add,
  getUserById,
  getUserInfo,
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

function getUserInfo(id) {
  return db("users as u")
    .where({ "u.id": id })
    .join("user_creds as uc", { "u.id" : "uc.id" })
    .select([
      "u.id",
      "uc.email",
      "u.username",
      "u.firstName",
      "u.lastName",
      "u.reviewCount",
      "u.created_at",
      "u.updated_at"
    ]);
}

function update(id, changes) {
  return db("users").where({ id }).update(changes, ['*']);
};
