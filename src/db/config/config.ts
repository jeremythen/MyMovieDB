
const dotenv = require("dotenv");
dotenv.config();

const DB_HOST = process.env.NODE_ENV === 'docker' ? 'mysqldb' : process.env.DB_HOST; // In case it's running from docker, using the db container name.

module.exports = {
  development: {
    dialect: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "mymoviedb",
    host: process.env.DB_HOST,
    port: process.env.DB_DATABASE_PORT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'mymoviedb_test',
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_DATABASE_PORT,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'mymoviedb_prod',
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_DATABASE_PORT,
  },
  docker: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "mymoviedb",
    host: "mysqldb",
    dialect: "mysql"
  },
};
