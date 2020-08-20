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
const bcrypt_1 = __importDefault(require("bcrypt"));
const util_1 = require("../util/util");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const validator_1 = __importDefault(require("validator"));
const jwtTokenUtil_1 = require("../util/jwtTokenUtil");
const enums_1 = require("../util/enums");
const { USER_CREATE_ERROR, USER_EMAIL_EXISTS, USER_INVALID_CREDENTIALS, USER_INVALID_PAYLOAD, USER_UNKNOWN_ERROR, USER_USERNAME_EXISTS } = enums_1.UserError;
class UserService {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.default.getUsers();
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.default.getUserByEmail(email);
        });
    }
    isAdmin(user) {
        return user !== null && user.role === enums_1.Role.ADMIN;
    }
    registerUser(userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRegistrationPayload = userPayload;
            const validationResult = validateRegisterUserPayload(userRegistrationPayload);
            if (!validationResult.valid) {
                return util_1.prepareResponse(null, false, USER_INVALID_PAYLOAD, validationResult.validationErrors);
            }
            try {
                const userWithEmail = yield userRepository_1.default.getUserByEmail(userRegistrationPayload.email);
                if (userWithEmail !== null) {
                    return util_1.prepareResponse(null, false, USER_EMAIL_EXISTS, ['An account with this email already exists']);
                }
                const userWithUsername = yield userRepository_1.default.getUserByUsername(userRegistrationPayload.username);
                if (userWithUsername !== null) {
                    return util_1.prepareResponse(null, false, USER_USERNAME_EXISTS, ['An account with this username already exists']);
                }
                const user = yield userRepository_1.default.createUser(userRegistrationPayload);
                if (user === null) {
                    return util_1.prepareResponse(null, false, USER_CREATE_ERROR, ['User registration was unsuccessful']);
                }
                const token = jwtTokenUtil_1.generateJwtToken(user);
                return util_1.prepareResponse({ user, token }, true);
            }
            catch (e) {
                return util_1.prepareResponse(null, false, USER_CREATE_ERROR, ['There was an error creating the user', e.message]);
            }
        });
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLoginPayload = payload;
            const validationResult = validateLoginUserPayload(userLoginPayload);
            const { username, password } = userLoginPayload;
            if (!validationResult.valid) {
                return util_1.prepareResponse(null, false, USER_INVALID_CREDENTIALS, validationResult.validationErrors);
            }
            const user = yield userRepository_1.default.getUserByUsername(username);
            if (user === null) {
                return util_1.prepareResponse(null, false, "USER_NOT_FOUND", [`The specified user with username ${username} was not found`]);
            }
            try {
                if (bcrypt_1.default.compareSync(`${password}`, user.getDataValue("password"))) {
                    const token = jwtTokenUtil_1.generateJwtToken(user);
                    return util_1.prepareResponse({ user, token }, true);
                }
                else {
                    return util_1.prepareResponse(null, false, USER_INVALID_CREDENTIALS);
                }
            }
            catch (error) {
                return util_1.prepareResponse(null, false, USER_UNKNOWN_ERROR, ['There was an unknown error. Try again later.']);
            }
        });
    }
}
const userService = Object.freeze(new UserService());
exports.default = userService;
/**
 *
 * @param payload which would be the user register data from request body.
 * This function checks that the required user data to create a new user are present.
 *
 */
const validateRegisterUserPayload = (payload) => {
    const validationResult = {
        valid: false,
        validationErrors: [],
    };
    if (!payload) {
        validationResult.valid = false;
        validationResult.validationErrors.push("No user payload was provided");
        return validationResult;
    }
    const { username, email, password } = payload;
    if (username && password && password.length > 5 && validator_1.default.isEmail(email)) {
        validationResult.valid = true;
        return validationResult;
        ;
    }
    if (!username) {
        validationResult.validationErrors.push("username is required");
    }
    if (!validator_1.default.isEmail(email)) {
        validationResult.validationErrors.push("email is required");
    }
    if (!password) {
        validationResult.validationErrors.push("password is required");
    }
    if (password && password.length < 6) {
        validationResult.validationErrors.push("password minimum length is 6 characters");
    }
    return validationResult;
};
const validateLoginUserPayload = (payload) => {
    const validationResult = {
        valid: false,
        validationErrors: [],
    };
    if (!payload) {
        validationResult.valid = false;
        validationResult.validationErrors.push("No user payload was provided");
        return validationResult;
    }
    const { username, password } = payload;
    if (username && password) {
        validationResult.valid = true;
        return validationResult;
    }
    if (!username) {
        validationResult.validationErrors.push("username is required");
    }
    if (!password) {
        validationResult.validationErrors.push("password is required");
    }
    return validationResult;
};
