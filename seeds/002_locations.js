exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw('TRUNCATE TABLE locations RESTART IDENTITY CASCADE')
    .then(function() {
      // Inserts seed entries
      return knex("locations").insert([
        {
          googleId: "jh5678ujklo0987udsew2qwsdfdr2222"
        },
        {
          googleId: "jkjhy65rtfdsew345tyhu2qwsdfd2222"
        },
        {
          googleId: "jhmjhgfrty7654ertgfrgfdsdfdr222"
        },
        {
          googleId: "jhmjhgfrty7654ert2222"
        }
      ]);
    });
};
