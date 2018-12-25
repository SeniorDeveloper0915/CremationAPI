/**
 * Up Skill table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating skill table');
    return knex.schema.createTable('skill', table => {
        table.increments('id').primary().unsigned();
        table.integer('Doctor_Id').notNullable();
        table.integer('First_Project_Id').notNullable();
        table.integer('Second_Project_Id').notNullable();
        table.integer('Third_Project_Id').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Skill table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping skill table');
    return knex.schema.dropTable('skill');
};