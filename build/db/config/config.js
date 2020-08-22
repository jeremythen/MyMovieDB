"use strict";
var _a;
const dotenv = require("dotenv");
dotenv.config();
const databaseName = ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) === 'test' ? 'mymoviedb_test' : 'mymoviedb';
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
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
        dialect: "mysql"
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'mymoviedb_prod',
        host: '127.0.0.1',
        dialect: "mysql"
    },
};
