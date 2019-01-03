/**
 * Up Order Stats table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating order_status table');
    return knex.schema.createTable('order_status', table => {
        table.increments('id').primary().unsigned();
        table.string('Status').notNullable();
    });
};

/**
 * Drop Order Status table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping order_status table');
    return knex.schema.dropTable('order_status');
};