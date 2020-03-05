//ENV Configuration
require("dotenv").config();

// Update with your config settings.

//ENVIRONMENT=development

module.exports = {
    development: {
        client: "pg",
        connection: process.env.DEV_SERVER,
        // ssl: true,
        migrations: {
            directory: "./migrations",
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./seeds"
        }

    },
    testing: {
        client: "pg",
        connection: process.env.TESTING_DATABASE,
        // ssl: true,
        migrations: {
            directory: "./migrations",
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./seeds"
        }

    },
    staging: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        // ssl: true,
        migrations: {
            directory: "./migrations",
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./seeds"
        }

    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        // ssl: true,
        migrations: {
            directory: "./migrations",
            tableName: "knex_migrations"
        },
        seeds: { directory: "./seeds" }
    }
};