"use strict";
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'mymoviedb',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'mymoviedb_test',
        host: 'localhost',
        dialect: "127.0.0.1"
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'mymoviedb_prod',
        host: '127.0.0.1',
        dialect: "mysql"
    },
};
