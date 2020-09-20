exports.up = function (knex) {
    return knex.schema.table('users', (table) => {
        table.boolean('approved').notNullable().defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('approved');
    });
};
