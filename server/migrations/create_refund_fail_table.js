/**
 * Up Refund Fail table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating refund_fail table');
    return knex.schema.createTable('refund_fail', table => {
        table.increments('id').primary().unsigned();
        table.integer('OrderId').notNullable();
        table.string('UserID').notNullable();
        table.string('PhoneNumber').notNullable();
        table.timestamp('Order_Date').notNullable();
        table.timestamp('Refund_Date').notNullable();
        table.string('Refund_Reason').notNullable();
        table.string('Fail_Reason').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Refund Fail table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping refund_fail table');
    return knex.schema.dropTable('refund_fail');
};