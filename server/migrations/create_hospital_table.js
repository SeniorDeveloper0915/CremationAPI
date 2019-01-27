/**
 * Up Hospital table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating hospital table');
    return knex.schema.createTable('hospital', table => {
        table.increments('id').primary().unsigned();
        table.string('Hospital_Name').notNullable();
        table.string('Logo').notNullable();
        table.string('Slogan').notNullable();
        table.string('Qualification').notNullable();
        table.string('Level').notNullable();
        table.integer('License').notNullable();
        table.integer('Address').notNullable();
        table.string('Introduction').notNullable();
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Hospital table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping hospital table');
    return knex.schema.dropTable('hospital');
};