"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const connection = mysql_1.default.createPool({
    connectionLimit: 10,
    host: "<host>",
    user: "<user>",
    password: "<pass>",
    database: "mymoviedb",
});
exports.default = connection;
