"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidRole = exports.handleCommonResponse = exports.prepareResponse = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const enums_1 = require("./enums");
exports.prepareResponse = (data, success, errorCode = "", errorMessages = []) => {
    return { data, success, errorCode, errorMessages };
};
exports.handleCommonResponse = (MyMovieDbResponse, res) => {
    if (!MyMovieDbResponse.success) {
        return res.status(http_status_codes_1.default.BAD_REQUEST).send(MyMovieDbResponse);
    }
    res.send(MyMovieDbResponse);
};
exports.isValidRole = (role) => {
    return role === enums_1.Role.USER || role === enums_1.Role.ADMIN;
};
