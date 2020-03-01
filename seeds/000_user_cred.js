const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex
        .raw('TRUNCATE TABLE user_creds RESTART IDENTITY CASCADE')
        .then(function () {
            // Inserts seed entries
            return knex("user_creds").insert([
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
