import User from '../db/models/User';
import bcrypt from 'bcrypt';
import { prepareResponse, Response } from '../util/util';
import userRepository from '../repositories/userRepository';
import validator from 'validator';
import { generateJwtToken } from '../util/jwtTokenUtil';
import { UserError, Role } from '../util/enums';

const { USER_CREATE_ERROR, USER_EMAIL_EXISTS, USER_INVALID_CREDENTIALS, USER_INVALID_PAYLOAD, USER_UNKNOWN_ERROR, USER_USERNAME_EXISTS } = UserError;

class UserService {

    async getUsers(): Promise<User[]> {
        return await userRepository.getUsers();
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await userRepository.getUserByEmail(email);
    }

    isAdmin(user: User): boolean {
        return user !== null && user.role === Role.ADMIN;
    }

    async registerUser(userPayload: User): Promise<Response> {

        const userRegistrationPayload: User = userPayload;

        const validationResult = validateRegisterUserPayload(
            userRegistrationPayload
        );

        if (!validationResult.valid) {
            return prepareResponse(null, false, USER_INVALID_PAYLOAD, validationResult.validationErrors);
        }

        try {

            const userWithEmail = await userRepository.getUserByEmail(userRegistrationPayload.email);

            if (userWithEmail !== null) {
                return prepareResponse(null, false, USER_EMAIL_EXISTS, ['An account with this email already exists']);
            }

            const userWithUsername = await userRepository.getUserByUsername(userRegistrationPayload.username);

            if (userWithUsername !== null) {
                return prepareResponse(null, false, USER_USERNAME_EXISTS, ['An account with this username already exists']);
            }

            const user = await userRepository.createUser(userRegistrationPayload);

            if (user === null) {
                return prepareResponse(null, false, USER_CREATE_ERROR, ['User registration was unsuccessful']);
            }

            const token = generateJwtToken(user);
            return prepareResponse({ user, token }, true);

        } catch (e) {
            return prepareResponse(null, false, USER_CREATE_ERROR, ['There was an error creating the user', e.message]);
        }

    }

    async login(payload: User) {
        const userLoginPayload: User = payload;

        const validationResult = validateLoginUserPayload(userLoginPayload);

        const { username, password } = userLoginPayload;

        if (!validationResult.valid) {
            return prepareResponse(null, false, USER_INVALID_CREDENTIALS, validationResult.validationErrors);
        }

        const user = await userRepository.getUserByUsername(username);

        if (user === null) {
            return prepareResponse(null, false, "USER_NOT_FOUND", [`The specified user with username ${username} was not found`]);
        }

        try {
            if (bcrypt.compareSync(`${password}`, user.getDataValue("password"))) {

                const token = generateJwtToken(user);

                return prepareResponse({ user, token }, true);

            } else {
                return prepareResponse(null, false, USER_INVALID_CREDENTIALS);
            }
        } catch (error) {
            return prepareResponse(null, false, USER_UNKNOWN_ERROR, ['There was an unknown error. Try again later.']);
        }
    }

}

const userService = Object.freeze(new UserService());

export default userService;


interface ValidationResult {
    valid: boolean;
    validationErrors: string[];
}

/**
 * 
 * @param payload which would be the user register data from request body.
 * This function checks that the required user data to create a new user are present.
 * 
 */
const validateRegisterUserPayload = (payload: User): ValidationResult => {
    const validationResult: ValidationResult = {
        valid: false,
        validationErrors: [],
    };

    if (!payload) {
        validationResult.valid = false;
        validationResult.validationErrors.push("No user payload was provided");
        return validationResult;
    }

    const { username, email, password } = payload;

    if (username && password && password.length > 5 && validator.isEmail(email)) {
        validationResult.valid = true;
        return validationResult;;
    }

    if (!username) {
        validationResult.validationErrors.push("username is required");
    }

    if (!validator.isEmail(email)) {
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

const validateLoginUserPayload = (payload: User): ValidationResult => {

    const validationResult: ValidationResult = {
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

}