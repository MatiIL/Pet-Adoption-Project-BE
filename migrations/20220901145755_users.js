exports.up = function (knex) {
    return knex.schema.alterTable("users", function (table) {
      table.increments("userId").primary();
      table.string("firstName");
      table.string("lastName");
      table.string("phone");
      table.string("email").unique().notNull();
      table.string("password").notNull();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };