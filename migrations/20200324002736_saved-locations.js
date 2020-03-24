
exports.up = function(knex) {
  knex.schema.createTable("saved_locations", tbl => {
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
    tbl.primary(["usersId", "locationId"]);
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists("saved_locations");
};
