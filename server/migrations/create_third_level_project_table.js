/**
 * Up Third Level Project table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating project table');
    return knex.schema.createTable('project', table => {
        table.increments('id').primary().unsigned();
        table.integer('First_Project_Id').notNullable();
        table.integer('Second_Project_Id').notNullable();
        table.string('Project_Name').notNullable();
        table.string('Project_Alias').notNullable();
        table.string('Before_Img').notNullable();
        table.string('Effect_Img').notNullable();
        table.string('Description').notNullable();
        table.string('Features').notNullable();
        table.string('Efficiency').notNullable();
        table.string('Price_From').notNullable();
        table.string('Price_To').notNullable();
        table.string('Time_Period').notNullable();
        table.string('Aesthetic_standard').notNullable();
        table.string('Advantages').notNullable();
        table.string('Shortcoming').notNullable();
        table.string('Suitable').notNullable();
        table.string('Risk_Warning').notNullable();
        table.string('Pre_Precautions').notNullable();
        table.string('Care_considerations').notNullable();
        table.string('Effects_Treatment').notNullable();
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Third Level Project table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping project table');
    return knex.schema.dropTable('project');
};