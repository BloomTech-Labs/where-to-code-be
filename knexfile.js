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
    client: "postgresql",
    connection: {
      database: "postgres",
      user: "postgres",
      password: process.env.DB_Password
    },

    migrations: {
      database: "Postgres",
      user: "postgres",
      password: process.env.DB_Password
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.PRODUCTION_SERVER, //postgres://ropszhiypaokds:cc788a1aba301f3bc8bdcf2d4fc56280f1158a2f8b02d566ba5a852793c96786@ec2-23-21-156-171.compute-1.amazonaws.com:5432/dccmt8le0mj9t5
    // ssl: true,
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations"
    },
    seeds: { directory: "./seeds" }
  }
};
