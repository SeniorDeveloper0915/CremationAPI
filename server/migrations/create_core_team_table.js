/**
 * Up Core Team table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating core team table');
    return knex.schema.createTable('core_team', table => {
        table.increments('id').primary().unsigned();
        table.string('Member_Name').notNullable();
        table.string('Position').notNullable();
        table.string('Profile').notNullable();
        table.string('Member_Img').notNullable();
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Core Team table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping core team table');
    return knex.schema.dropTable('core_team');
};