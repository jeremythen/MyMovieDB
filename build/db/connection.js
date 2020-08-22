"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const envConfig_1 = __importDefault(require("../config/envConfig"));
const { database: { host, password, }, } = envConfig_1.default;
const sequelize = new sequelize_1.Sequelize('mymoviedb', 'root', password, {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
});
exports.default = sequelize;
