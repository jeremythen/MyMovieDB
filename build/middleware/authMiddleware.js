"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jwtTokenUtil_1 = require("../util/jwtTokenUtil");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const userService_1 = __importDefault(require("../services/userService"));
exports.authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
        return res.status(http_status_codes_1.default.UNAUTHORIZED).send();
    }
    const token = bearerToken.substr(7, bearerToken.length);
    const userData = jwtTokenUtil_1.verifyToken(token);
    if (userData === null) {
        return res.status(http_status_codes_1.default.UNAUTHORIZED).send();
    }
    const email = userData.email;
    const user = yield userService_1.default.getUserByEmail(email);
    if (user === null) {
        return res.status(http_status_codes_1.default.UNAUTHORIZED).send();
    }
    const isAdmin = userService_1.default.isAdmin(user);
    if (!isAdmin) {
        return res.status(http_status_codes_1.default.UNAUTHORIZED).send();
    }
    next();
});
