
exports.up = async function(knex) {
  await knex.schema.createTable("business_users", tbl => {
    tbl.integer("id") // - primary key
      .primary()
      .notNullable()
      .unique()
      .references("id")
      .inTable("user_creds")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("firstName").notNullable();
    tbl.string("lastName").notNullable();
    tbl.string("name").notNullable();
    tbl.string("icon");
    tbl.string("address").notNullable().unique();
    tbl.decimal("rating").default(0);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("business_users");
};
