exports.up = function (knex) {
    return knex.schema.createTable('urls', (table) => {
        table.increments('id');
        table.string('longUrl', 256).notNullable();
        table.string('shortUrl', 128).notNullable().unique();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('urls');
};
