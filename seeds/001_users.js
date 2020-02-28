exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "Ronny_userName",
          firstName: "Ronny",
          lastName: "Pipper"
        },
        {
          id: 2,
          username: "Reed_userName",
          firstName: "Reed",
          lastName: "Peters"
        },
        {
          id: 3,
          username: "Bernard_userName",
          firstName: "Bernard",
          lastName: "Johnson"
        },
        {
          id: 4,
          username: "Levi_userName",
          firstName: "Levi",
          lastName: "Jeans"
        },
        {
          id: 5,
          username: "Ami_userName",
          firstName: "Ami",
          lastName: "Jones"
        },
        {
          id: 6,
          username: "David_userName",
          firstName: "David",
          lastName: "Smith"
        },

      ]);
    });
};

/*tbl.increments(); // primary key - user id
    tbl.string("firebase_user_id"); // firebase id
    tbl
      .string("userName") // RonnySAlvarado
      .notNullable()
      .unique();
    tbl.string("userType").notNullable(); // Owner, Student, Programmer, Someone actually normal
    tbl.string("email"); // Rsalvarado777@gmail.com
    tbl.integer("reviewCount"); // 300
    tbl.timestamps(true, true); // when account was created
*/
