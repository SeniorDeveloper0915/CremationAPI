/**
 * Up Contact table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating contact table');
    return knex.schema.createTable('contact', table => {
        table.increments('id').primary().unsigned();
        table.string('Information').notNullable();
        table.string('Contact_Img').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Contact table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping contact table');
    return knex.schema.dropTable('contact');
};