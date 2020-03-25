exports.up = async function(knex) {

  await knex.schema.createTable("user_creds", tbl => {
    tbl.increments();
    tbl.string("username").notNullable().unique(); // - afochoa
    tbl.string("email").notNullable().unique(); // - fake_email@place.com
    tbl.string("password").notNullable(); // - bestsecretever
    tbl.string("role").notNullable(); // - user || business
  });

  await knex.schema.createTable("users", tbl => {
    tbl.integer("id") // - primary key
      .unsigned()
      .primary()
      .notNullable()
      .unique()
      .references("id")
      .inTable("user_creds")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("username") // - afochoa
      .references("username")
      .inTable("user_creds")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("firstName").notNullable() // - Aciel
    tbl.string("lastName").notNullable(); // - Ochoa
    tbl.integer("reviewCount").default(0); // - 300
    tbl.timestamps(true, true); // - When account was created
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("user_creds");
};
