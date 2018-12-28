/**
 * Up Recruitment table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating recruitment table');
    return knex.schema.createTable('recruitment', table => {
        table.increments('id').primary().unsigned();
        table.string('Link').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Recruitment table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping recruitment table');
    return knex.schema.dropTable('recruitment');
};