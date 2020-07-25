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
        connection: process.env.DATABASE_PROD_URL,
        migrations: {
            directory: './db/migrations/prod',
        },
        seeds: {
            directory: './db/seeds/prod',
        },
        useNullAsDefault: true,
    },
};
