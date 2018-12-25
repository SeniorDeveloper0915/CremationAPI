/**
 * Up Doctor Title table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating doctor_title table');
    return knex.schema.createTable('doctor_title', table => {
        table.increments('id').primary().unsigned();
        table.string('Doctor_Title').notNullable();
        table.integer('Sort').notNullable();
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Doctor Title table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping doctor_title table');
    return knex.schema.dropTable('doctor_title');
};