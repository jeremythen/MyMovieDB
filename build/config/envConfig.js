"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    database: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        databaseName: 'mymoviedb',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    port: process.env.PORT,
    seqSeeds: process.env.SEQ_SEEDS || 20,
};
