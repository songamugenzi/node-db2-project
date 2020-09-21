exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments("carID");
    tbl.string("VIN", 128).notNullable().unique();
    tbl.string("Make", 128).notNullable();
    tbl.string("Model", 128).notNullable();
    tbl.integer("Mileage", 128).notNullable();
    tbl.string("TransmissionType", 128);
    tbl.string("TitleStatus", 128);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
