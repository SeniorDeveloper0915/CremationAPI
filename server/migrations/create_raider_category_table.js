/**
 * Up Raider Category table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating raider_category table');
    return knex.schema.createTable('raider_category', table => {
        table.increments('id').primary().unsigned();
        table.string('Category_Name').notNullable();
        table.integer('Article_Cnt').default(0);
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Raider Category table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping raider_category table');
    return knex.schema.dropTable('raider_category');
};