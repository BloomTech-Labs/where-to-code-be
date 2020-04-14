exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE saved_locations RESTART IDENTITY CASCADE")
    .then(function() {
      // Inserts seed entries
      return knex("saved_locations").insert([
        { userId: 1, locationId: 1 },
        { userId: 2, locationId: 4 },
        { userId: 3, locationId: 3 }
      ]);
    });
};
