/**
 * Up Notification table.
 *
 * @param  {object} knex
 *
 */
exports.up = function(knex) {
    console.log('generating notification table');
    return knex.schema.createTable('notification', table => {
        table.increments('id').primary().unsigned();
        table.string('Title').notNullable();
        table.string('Image').notNullable();
        table.string('Notice').notNullable();
        table.integer('PageViews').notNullable().default(0);
        table.bool('Status').default(false);
        table.timestamp('Release_Time');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

/**
 * Drop Notification table.
 *
 * @param  {object} knex
 *
 */
exports.down = function(knex) {
    console.log('dropping notification table');
    return knex.schema.dropTable('notification');
};