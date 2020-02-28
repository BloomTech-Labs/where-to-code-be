const db = require('../../config/knexConfig');

module.exports = {
  findBy,
  add,
  remove,
  update
};

function findBy(id) {
  return db('user_creds').where(id);
}

function add(user) {
  return db('user_creds').insert(user, ['*']);
}

function remove(id) {
  return db('user_creds').where({ id }).del();
}

function update(id, changes) {
  return db('user_creds').where({ id }).update(changes, ['*']);
}