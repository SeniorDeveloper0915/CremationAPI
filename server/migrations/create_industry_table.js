/**
 * Up Industry table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating industry table');
    return knex.schema.createTable('industry', table => {
        table.increments('id').primary().unsigned();
        table.string('Industry_Title').notNullable();
        table.string('Industry_Subtitle').notNullable();
        table.string('Industry_Img').notNullable();
        table.string('Industry_Content').notNullable();
        table.integer('Reading_Volume').notNullable().default(0);
        table.integer('Sort').notNullable();
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Industry table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping industry table');
    return knex.schema.dropTable('industry');
};