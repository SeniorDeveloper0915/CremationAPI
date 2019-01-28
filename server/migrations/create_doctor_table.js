/**
 * Up Doctor table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating doctor table');
    return knex.schema.createTable('doctor', table => {
        table.increments('id').primary().unsigned();
        table.string('Doctor_Name').notNullable();
        table.integer('Title_Id').notNullable();
        table.string('Photo').notNullable();
        table.integer('Length').notNullable();
        table.string('Certi_Number').notNullable();
        table.integer('Address').notNullable();
        table.string('Profile', 5000).notNullable();
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop doctor table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping doctor table');
    return knex.schema.dropTable('doctor');
};