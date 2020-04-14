exports.up = async function(knex) {
  await knex.schema.createTable("locations", tbl => {
    tbl.increments(); // primary key - location id
    tbl.string("googleId").unique(); // id for goole-maps-api
    tbl.string("name");
    tbl.string("address").unique();
    tbl.string("phone");
    tbl.string("icon");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("locations");
};
