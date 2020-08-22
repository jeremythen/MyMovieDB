"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("process.env.DB_PASSWORD", process.env.DB_PASSWORD);
exports.default = {
    database: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        databaseName: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dbHost: process.env.DB_HOST,
    },
    port: process.env.PORT,
    seqSeeds: process.env.SEQ_SEEDS || 20,
};
