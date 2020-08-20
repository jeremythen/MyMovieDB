"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Using || '' to bypass typescript undefined check for jwt.sign.
const secret = process.env.JWT_SECRET || '';
exports.generateJwtToken = (user) => {
    const { username, email } = user;
    const data = { username, email };
    return jsonwebtoken_1.default.sign(data, secret, {
        expiresIn: '7d',
    });
};
exports.verifyToken = (jwtToken) => {
    try {
        const verification = jsonwebtoken_1.default.verify(jwtToken, secret);
        console.log("verification", verification);
        return verification;
    }
    catch (e) {
        console.log("e", e);
        return null;
    }
};
