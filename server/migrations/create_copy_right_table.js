/**
 * Up Copy Right table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating copy right table');
    return knex.schema.createTable('copy_right', table => {
        table.increments('id').primary().unsigned();
        table.string('Title').notNullable();
        table.string('Content').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Copy Right table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping copy right table');
    return knex.schema.dropTable('copy_right');
};