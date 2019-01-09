/**
 * Up users table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating users table');
    return knex.schema.createTable('users', table => {
        table.increments('id').primary().unsigned();
        table.string('UserID').notNullable();
        table.string('Account').notNullable();
        table.string('NickName').notNullable();
        table.string('Email').notNullable();
        table.string('Password').notNullable();
        table.boolean('Gender');
        table.timestamp('Birthday');
        table.integer('Area').notNullable();
        table.string('Avatar').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop users table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping users table');
    return knex.schema.dropTable('users');
};