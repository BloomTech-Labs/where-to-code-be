const bcrypt = require('bcryptjs')

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("users")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("users").insert([
                {
                    username:"test1",
                    email:"test1@gmail.com",
                    password: bcrypt.hashSync("test", 10),
                    role:"user"
                }, {
                    username: "test2",
                    email: "test2@gmail.com",
                    password: bcrypt.hashSync("test2", 10),
                    role: "user"
                }, {
                    username: "test3",
                    email: "test3@gmail.com",
                    password: bcrypt.hashSync("test3", 10),
                    role: "user"
                }, {
                    username: "test4",
                    email: "test4@gmail.com",
                    password: bcrypt.hashSync("test4", 10),
                    role: "user"
                }, {
                    username: "test5",
                    email: "test5@gmail.com",
                    password: bcrypt.hashSync("test5", 10),
                    role: "user"
                }, {
                    username: "test6",
                    email: "test6@gmail.com",
                    password: bcrypt.hashSync("test6", 10),
                    role: "user"
                }
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
