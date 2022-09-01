exports.up = function (knex) {
    return knex.schema.createTable("users_pet_list", function (table) {
      table.integer("userId").unsigned();
      table.integer("petId").unsigned();
      table.primary(["userId", "petId"]);
      table.foreign("userId").references("users.userId");
      table.foreign("petId").references("pets.petId");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("users-pet-list");
  };