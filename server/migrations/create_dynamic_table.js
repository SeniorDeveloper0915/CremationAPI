/**
 * Up Dynamic table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating dynamic table');
    return knex.schema.createTable('dynamic', table => {
        table.increments('id').primary().unsigned();
        table.string('Dynamic_Title').notNullable();
        table.string('Dynamic_Subtitle').notNullable();
        table.string('Dynamic_Img').notNullable();
        table.string('Dynamic_Content', 5000).notNullable();
        table.integer('Reading_Volume').notNullable().default(0);
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Dynamic table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping dynamic table');
    return knex.schema.dropTable('dynamic');
};