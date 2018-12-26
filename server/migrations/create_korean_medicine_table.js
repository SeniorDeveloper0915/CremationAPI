/**
 * Up Korean Medicine table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating korean medicine table');
    return knex.schema.createTable('korean_medicine', table => {
        table.increments('id').primary().unsigned();
        table.string('Title').notNullable();
        table.string('Content').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Korean Medicine table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping korean medicine table');
    return knex.schema.dropTable('korean_medicine');
};