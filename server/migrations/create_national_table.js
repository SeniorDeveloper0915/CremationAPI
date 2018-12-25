/**
 * Up Nation table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating nation table');
    return knex.schema.createTable('nation', table => {
        table.increments('id').primary().unsigned();
        table.string('Nation_Name').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Nation table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping nation table');
    return knex.schema.dropTable('nation');
};