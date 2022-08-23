const path = require("path");
const pathToMigrations = path.resolve(__dirname, "../migrations");

module.exports = {
  client: "mysql",
  connection: {
    database: "petsapp_db",
    user: "root",
    password: "MBSQL1982",
    host: "localhost",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: pathToMigrations,
  },
};
