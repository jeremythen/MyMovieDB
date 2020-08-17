"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const envConfig_1 = __importDefault(require("../config/envConfig"));
const { database: { host, name: database, user, password }, } = envConfig_1.default;
;
const connection = mysql_1.default.createPool({
    connectionLimit: 10,
    host,
    user,
    password,
    database,
});
exports.default = connection;
