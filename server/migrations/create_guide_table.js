/**
 * Up Guide table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating guide table');
    return knex.schema.createTable('guide', table => {
        table.increments('id').primary().unsigned();
        table.string('BootPage_Title').notNullable();
        table.string('BootPage_Img').notNullable();
        table.string('URL').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Guide table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping guide table');
    return knex.schema.dropTable('guide');
};