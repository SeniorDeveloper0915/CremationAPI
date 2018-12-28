/**
 * Up Promotin Image table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating promotion_image table');
    return knex.schema.createTable('promotion_image', table => {
        table.increments('id').primary().unsigned();
        table.integer('Product_Id').notNullable();
        table.string('Images').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Promotion Image table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping promotion_image table');
    return knex.schema.dropTable('promotion_image');
};