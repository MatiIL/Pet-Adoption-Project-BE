exports.up = function(knex) {
    return knex.schema.table('users', function(t) {
        t.dropColumn('repeatPassword');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
