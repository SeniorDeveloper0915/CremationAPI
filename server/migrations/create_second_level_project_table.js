/**
 * Up Second Level Project table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating second_project table');
    return knex.schema.createTable('second_project', table => {
        table.increments('id').primary().unsigned();
        table.integer('First_Project_Id').notNullable();
        table.string('Project_Name').notNullable();
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Second Level Project table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping second_project table');
    return knex.schema.dropTable('second_project');
};