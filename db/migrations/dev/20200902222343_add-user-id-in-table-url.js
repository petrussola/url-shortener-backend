exports.up = function (knex) {
    function addUserIdColumn() {
        return knex.schema.table('urls', (table) => {
            table
                .integer('userId')
                .unsigned()
                .notNullable()
                .defaultTo(1)
                .references('id')
                .inTable('urls');
        });
    }
    function removeDefaultFromUserId() {
        return knex.schema.alterTable('urls', (table) => {
            table.integer('userId').notNullable().alter();
        });
    }

    return addUserIdColumn().then(removeDefaultFromUserId);
};

exports.down = function (knex) {
    return knex.schema('urls', (table) => {
        table.dropcolumn('userId');
    });
};
