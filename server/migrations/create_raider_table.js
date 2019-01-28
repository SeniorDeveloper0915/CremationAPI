/**
 * Up Raider table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating raider table');
    return knex.schema.createTable('raider', table => {
        table.increments('id').primary().unsigned();
        table.integer('Category_Id').notNullable();
        table.string('Raider_Title').notNullable();
        table.string('Raider_Sec_Title').notNullable();
        table.string('Raider_Img').notNullable();
        table.string('Content', 5000).notNullable();
        table.integer('Reading_Volume').notNullable().default(0);
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Raider table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping raider table');
    return knex.schema.dropTable('raider');
};