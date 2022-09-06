exports.up = function (knex) {
    return knex.schema.alterTable("users", function (table) {
      table.text("bio");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };