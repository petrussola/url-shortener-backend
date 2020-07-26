// Update with your config settings.
require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_DEV_URL,
        migrations: {
            directory: './db/migrations/dev',
        },
        seeds: {
            directory: './db/seeds/dev',
        },
        useNullAsDefault: true,
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './db/migrations/dev',
        },
        seeds: {
            directory: './db/seeds/dev',
        },
        useNullAsDefault: true,
    },
};
