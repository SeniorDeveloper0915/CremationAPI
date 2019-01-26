/**
 * Up Case table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating case table');
    return knex.schema.createTable('hospital_case', table => {
        table.increments('id').primary().unsigned();
        table.integer('Hospital_Id').notNullable();
        table.string('Case_Img').notNullable();
        table.string('Title').notNullable();
        table.timestamp('Time').notNullable();
        table.integer('Doctor_Id').notNullable();
        table.string('Introduction').notNullable();
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Case table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping case table');
    return knex.schema.dropTable('hospital_case');
};