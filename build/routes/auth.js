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
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../db/models/User"));
const userService_1 = __importDefault(require("../services/userService"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const Router = express_1.default.Router();
Router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield userService_1.default.registerUser(req.body);
    if (!response.success) {
        return res.status(400).send(response);
    }
    res.send(response);
}));
Router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield userService_1.default.login(req.body);
    if (!response.success) {
        return res.status(400).send(response);
    }
    res.send(response);
}));
Router.get('/users', authMiddleware_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.findAll();
    res.send(users);
}));
exports.default = Router;
