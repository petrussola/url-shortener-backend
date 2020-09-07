exports.up = function (knex) {
    return knex.schema.table('urls', (table) => {
        table
            .integer('userId')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.table('urls', (table) => {
        table.dropColumn('userId');
    });
};
