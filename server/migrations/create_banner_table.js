/**
 * Up Banner table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating banner table');
    return knex.schema.createTable('banner', table => {
        table.increments('id').primary().unsigned();
        table.string('Banner_Title').notNullable();
        table.integer('URL').notNullable();
        table.string('Banner_Img').notNullable();
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Banner table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping banner table');
    return knex.schema.dropTable('banner');
};