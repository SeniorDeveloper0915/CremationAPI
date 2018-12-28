/**
 * Up Product table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating product table');
    return knex.schema.createTable('product', table => {
        table.increments('id').primary().unsigned();
        table.string('Product_Title').notNullable();
        table.string('Cover_Img').notNullable();
        table.double('Origin_Price').notNullable();
        table.double('Start_Price').notNullable();
        table.double('Boooking').notNullable();
        table.integer('First_Project_Id').notNullable();
        table.integer('Second_Project_Id').notNullable();
        table.string('Third_Project_Id').notNullable();
        table.string('Price_Description').notNullable();
        table.string('Details').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Product table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping product table');
    return knex.schema.dropTable('product');
};