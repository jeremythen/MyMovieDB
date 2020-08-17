"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    database: {
        user: process.env.USER,
        password: process.env.PASSWORD,
        name: process.env.DATABASE,
        host: process.env.HOST,
    },
    port: process.env.PORT,
};
