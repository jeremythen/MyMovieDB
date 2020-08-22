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
const chai_1 = require("chai");
const userService_1 = __importDefault(require("../services/userService"));
const connection_1 = __importDefault(require("../db/connection"));
const enums_1 = require("../util/enums");
const { USER_INVALID_ID, USER_NOT_FOUND } = enums_1.UserError;
beforeEach(function () {
    connection_1.default.models.User.destroy({ where: {}, truncate: true });
});
describe('Users tests', () => {
    it('create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield userService_1.default.registerUser({
            firstName: 'Jeremy',
            lastName: 'Then',
            email: 'jeremy@gmail.com',
            username: 'jthen',
            password: 'mypass',
        });
        chai_1.expect(response === null).to.be.false;
        chai_1.expect(response.success).to.be.true;
        const username = response.data.user.getDataValue('username');
        chai_1.expect(username).to.equal('jthen');
    }));
    it('Get user by inexistent username', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield userService_1.default.getUserByUsername('oasdfkajsdglkasdg');
        chai_1.expect(response === null).to.be.false;
        chai_1.expect(response.success, 'Expecting userService response to be unsuccessful').to.be.false;
        chai_1.expect(response.data, 'Expecting data to be null since no user is found').to.be.null;
        chai_1.expect(response.errorCode, `Expected to see '${USER_NOT_FOUND} but got '${response.errorCode}`).to.equal(USER_NOT_FOUND);
    }));
    it('Get user by invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield userService_1.default.getUserById(-7235);
        chai_1.expect(response === null).to.be.false;
        chai_1.expect(response.success, 'Expecting success to be false since an invalid (negative) id was sent').to.be.false;
        chai_1.expect(response.data, 'Expecting data to be null since invalid id was sent').to.be.null;
        chai_1.expect(response.errorCode, `Expected to see '${USER_INVALID_ID} but got '${response.errorCode}`).to.equal(USER_INVALID_ID);
    }));
});
