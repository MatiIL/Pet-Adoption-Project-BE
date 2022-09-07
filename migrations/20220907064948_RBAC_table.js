exports.up = function (knex) {
    return knex.schema.createTable("RBAC_table", function (table) {
      table.integer("userId").unsigned();
      table.primary("userId");
      table.foreign("userId").references("users.userId");
      table.boolean("admin");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("RBAC_table");
  };
