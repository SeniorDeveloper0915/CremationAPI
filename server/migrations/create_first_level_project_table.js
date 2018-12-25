/**
 * Up First Level Project table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating first_project table');
    return knex.schema.createTable('first_project', table => {
        table.increments('id').primary().unsigned();
        table.string('Project_Name').notNullable();
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop First Level Project table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping first_project table');
    return knex.schema.dropTable('first_project');
};