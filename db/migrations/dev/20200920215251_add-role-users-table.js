exports.up = function (knex) {
    return knex.schema.table('users', (table) => {
        table.boolean('admin').notNullable().defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('admin');
    });
};
