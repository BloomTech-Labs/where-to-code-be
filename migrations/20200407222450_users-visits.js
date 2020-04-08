exports.up = async function (knex) {
  await knex.schema.createTable("users_visits", (tbl) => {
    tbl.increments();
    tbl
      .integer("userId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("locationId")
      .unsigned()
      .references("id")
      .inTable("locations")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.timestamp("timestamp");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users_visits");
};
