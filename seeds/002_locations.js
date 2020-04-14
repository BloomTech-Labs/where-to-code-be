exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw('TRUNCATE TABLE locations RESTART IDENTITY CASCADE')
    .then(function() {
      // Inserts seed entries
      return knex("locations").insert([
        {
          googleId: "ChIJOXb02ECuEmsR_UWvHCtCG-Q"
        },
        {
          googleId: "ChIJC5l9fqtYXIYRWY2C5prI2Bg"
        },
        {
          googleId: "ChIJXXeqGatYXIYRoce9HbGhKVI"
        },
        {
          googleId: "ChIJRYcAgQ37XoYRpa0yd-0lElQ"
        },
        {
          "name": "Bob's Burgers",
          "address": "123 Burger Ln",
          "phone": "(555)555-5555",
        }
      ]);
    });
};
