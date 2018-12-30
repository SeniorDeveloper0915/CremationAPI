/**
 * Up Question & Answer table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating qa table');
    return knex.schema.createTable('qa', table => {
        table.increments('id').primary().unsigned();
        table.string('PhoneNumber').notNullable();
        table.string('Question_Title').notNullable();
        table.string('Question_Content').notNullable();
        table.timestamp('Question_Time');
        table.integer('Doctor_Id').notNullable();
        table.string('Answer_Content').notNullable();
        table.timestamp('Answer_Time');
        table.bool('Status').default(false);
        table.integer('Reading_Volume').notNullable().default(0);
        table.integer('First_Project_Id').notNullable();
        table.integer('Second_Project_Id').notNullable();
        table.integer('Third_Project_Id').notNullable();
        table.string('Verification').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Question & Answer table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping qa table');
    return knex.schema.dropTable('qa');
};