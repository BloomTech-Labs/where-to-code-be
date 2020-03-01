exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "test1",
          firstName: "Ronny",
          lastName: "Pipper"
        },
        {
          id: 2,
          username: "test2",
          firstName: "Reed",
          lastName: "Peters"
        },
        {
          id: 3,
          username: "test3",
          firstName: "Bernard",
          lastName: "Johnson"
        },
        {
          id: 4,
          username: "test4",
          firstName: "Levi",
          lastName: "Jeans"
        },
        {
          id: 5,
          username: "test5",
          firstName: "Ami",
          lastName: "Jones"
        },
        {
          id: 6,
          username: "test6",
          firstName: "David",
          lastName: "Smith"
        }
      ]);
    });
};
