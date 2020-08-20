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
const User_1 = __importDefault(require("../db/models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserRepository {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findAll();
        });
    }
    createUser(userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, firstName = "", lastName = "", } = userPayload;
            const newUser = yield User_1.default.create({
                username,
                email,
                password: bcrypt_1.default.hashSync(password, 10),
                firstName,
                lastName,
            });
            return newUser;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({ where: { id: userId } });
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({ where: { username } });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({ where: { email } });
        });
    }
}
const moviesRepository = Object.freeze(new UserRepository());
exports.default = moviesRepository;
