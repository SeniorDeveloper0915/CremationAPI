/**
 * Up Help Center table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating help center table');
    return knex.schema.createTable('help_center', table => {
        table.increments('id').primary().unsigned();
        table.string('Title').notNullable();
        table.string('Content', 5000).notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Help Center table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping help center table');
    return knex.schema.dropTable('help_center');
};