
exports.up = async function(knex) {
  await knex.schema.createTable("saved_locations", tbl => {
    tbl.integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.integer("locationId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("locations")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.primary(["userId", "locationId"]);
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("saved_locations");
};
