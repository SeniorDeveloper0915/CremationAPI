/**
 * Up Team table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating team table');
    return knex.schema.createTable('team', table => {
        table.increments('id').primary().unsigned();
        table.integer('Hospital_Id').notNullable();
        table.integer('Doctor_Id').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Team table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping team table');
    return knex.schema.dropTable('team');
};