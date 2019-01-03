/**
 * Up Order table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating order table');
    return knex.schema.createTable('order', table => {
        table.increments('id').primary().unsigned();
        table.string('UserID').notNullable();
        table.string('PhoneNumber').notNullable();
        table.string('NickName').notNullable();
        table.timestamp('Order_Date').notNullable();
        table.string('Product_Name').notNullable();
        table.string('Order_Amount').notNullable();
        table.integer('Status_Id').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Order table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping order table');
    return knex.schema.dropTable('order');
};