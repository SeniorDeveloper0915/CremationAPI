/**
 * Up Publicity Photo table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating publicity_photo table');
    return knex.schema.createTable('publicity_photo', table => {
        table.increments('id').primary().unsigned();
        table.integer('Hospital_Id').notNullable();
        table.string('Photos').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Publicity Photo table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping publicity_photo table');
    return knex.schema.dropTable('publicity_photo');
};