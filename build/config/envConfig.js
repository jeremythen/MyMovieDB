"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dialect = ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) === 'test' ? 'sqlite' : process.env.DB_DIALECT;
exports.default = {
    database: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        databaseName: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect,
    },
    port: process.env.PORT,
    seqSeeds: process.env.SEQ_SEEDS || 20,
};
