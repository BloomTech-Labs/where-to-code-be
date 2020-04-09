exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE user_visits RESTART IDENTITY CASCADE")
    .then(function () {
      // Inserts seed entries
      return knex("user_visits").insert([
        { userId: 1, locationId: 5 },
        { userId: 2, locationId: 4 },
        { userId: 3, locationId: 3 },
        { userId: 4, locationId: 2 },
        { userId: 5, locationId: 1 },
        { userId: 6, locationId: 5 },
        { userId: 1, locationId: 1 },
        { userId: 2, locationId: 2 },
        { userId: 3, locationId: 4 },
        { userId: 4, locationId: 5 },
        { userId: 5, locationId: 1 },
        { userId: 6, locationId: 3 },
      ]);
    });
};
