/**
 * Up Service table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating service table');
    return knex.schema.createTable('service', table => {
        table.increments('id').primary().unsigned();
        table.integer('Hospital_Id').notNullable();
        table.integer('First_Project_Id').notNullable();
        table.integer('Second_Project_Id').notNullable();
        table.integer('Third_Project_Id').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Service table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping service table');
    return knex.schema.dropTable('service');
};