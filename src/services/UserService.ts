import User, { UserCreationAttributes } from '../db/models/User';
import bcrypt from 'bcrypt';
import { prepareResponse, MyMovieDbResponse, isValidRole, isValidId } from '../util/util';
import UserRepository from '../repositories/UserRepository';
import validator from 'validator';
import { generateJwtToken } from '../util/jwtTokenUtil';
import { UserError, Role } from '../util/enums';
import { ValidationResult } from '../util/util';

const { USER_CREATE_ERROR, USER_EMAIL_EXISTS, USER_INVALID_CREDENTIALS, USER_INVALID_PAYLOAD, USER_UNKNOWN_ERROR, USER_USERNAME_EXISTS, USER_NOT_FOUND, USER_INVALID_ROLE, USER_INVALID_ID } = UserError;

class UserService {

    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     * 
     * Get the list of registered users
     * @returns returns the list of registered users
     * 
     */
    async getUsers(): Promise<MyMovieDbResponse<User[] | null>>  {
        const users = await this.userRepository.getUsers();
        return prepareResponse(users, true);
    }

    /**
     * 
     * @param email 
     * @returns a Promise with a MyMovieDbResponse object containing the 'user' attribute in it's 'data' attribute
     * 
     */
    async getUserByEmail(email: string): Promise<MyMovieDbResponse<User | null>>  {
        const user = await this.userRepository.getUserByEmail(email);
        return prepareResponse(user, true);
    }

    /**
     * 
     * @param username 
     * @returns a Promise with a MyMovieDbResponse object containing the 'user' attribute in it's 'data' attribute
     * 
     */
    async getUserByUsername(username: string): Promise<MyMovieDbResponse<User | null>> {
        const user = await this.userRepository.getUserByUsername(username);
        if (user === null) {
            return prepareResponse(null, false, USER_NOT_FOUND, `User with username '${username} was not found`);
        }
        return prepareResponse(user, true);
    }

    /**
     *
     * @param id
     * @returns a Promise with a MyMovieDbResponse object containing the 'user' attribute in it's 'data' attribute
     *
     */
    async getUserById(id: number): Promise<MyMovieDbResponse<User | null>> {

        if (!isValidId(id)) {
            return prepareResponse(null, false, USER_INVALID_ID, `User id is invalid`);
        }

        const user = await this.userRepository.getUserById(id);
        if (user === null) {
            return prepareResponse(null, false, USER_NOT_FOUND, `User with username '${id} was not found`);
        }
        return prepareResponse(user, true);
    }

    /**
     * 
     * @param user 
     * Checks if the user has ADMIN role
     * @returns a boolean specifying if the user is ADMIN
     * 
     */
    isAdmin(user: UserCreationAttributes): boolean {
        return user !== null && user.role === Role.ADMIN;
    }

    /**
     * 
     * @param userPayload payload with user information to register. username, email and password are required
     * @returns a Promise with a MyMovieDbResponse object containing the 'user' attribute in it's 'data' attribute
     * 
     */
    async registerUser(userPayload: UserCreationAttributes): Promise<MyMovieDbResponse<RegisterLoginUserResponse | null>> {

        const validationResult = validateRegisterUserPayload(userPayload);

        if (!validationResult.valid) {
            return prepareResponse(null, false, USER_INVALID_PAYLOAD, validationResult.validationErrors);
        }

        try {

            const userWithEmail = await this.userRepository.getUserByEmail(userPayload.email);

            if (userWithEmail !== null) {
                return prepareResponse(null, false, USER_EMAIL_EXISTS, ['An account with this email already exists']);
            }

            const userWithUsername = await this.userRepository.getUserByUsername(userPayload.username);

            if (userWithUsername !== null) {
                return prepareResponse(null, false, USER_USERNAME_EXISTS, ['An account with this username already exists']);
            }

            const user = await this.userRepository.createUser(userPayload);

            if (user === null) {
                return prepareResponse(null, false, USER_CREATE_ERROR, ['User registration was unsuccessful']);
            }

            const token = generateJwtToken(user);
            return prepareResponse({ user, token }, true);

        } catch (e) {
            return prepareResponse(null, false, USER_CREATE_ERROR, ['There was an error creating the user', e.message]);
        }

    }

    /**
     * 
     * @param payload to authenticate the user. username and password are required
     * @returns a Promise with a MyMovieDbResponse object containing the 'user' attribute in it's 'data' attribute
     * 
     */
    async login(payload: UserLoginPayload): Promise<MyMovieDbResponse<RegisterLoginUserResponse | null>>  {

        const validationResult = validateLoginUserPayload(payload);

        const { username, password } = payload;

        if (!validationResult.valid) {
            return prepareResponse(null, false, USER_INVALID_CREDENTIALS, validationResult.validationErrors);
        }

        const user = await this.userRepository.getUserByUsername(username);

        if (user === null) {
            return prepareResponse(null, false, "USER_NOT_FOUND", [`The specified user with username ${username} was not found`]);
        }

        try {
            if (bcrypt.compareSync(`${password}`, user.getDataValue("password"))) {

                const token = generateJwtToken(user);

                return prepareResponse({ user, token }, true);

            } else {
                return prepareResponse(null, false, USER_INVALID_CREDENTIALS, 'Invalid user credential');
            }
        } catch (error) {
            return prepareResponse(null, false, USER_UNKNOWN_ERROR, ['There was an unknown error. Try again later.']);
        }
    }

    /**
     * 
     * @param username of the user to be deleted
     * @returns a Promise with a MyMovieDbResponse object containing the 'deleted' attribute in it's 'data' attribute
     * 
     */
    async deleteUserByUsername(username: string): Promise<MyMovieDbResponse<boolean | null>>  {
        const user = await this.userRepository.getUserByUsername(username);

        if (user === null) {
            return prepareResponse(null, false, USER_NOT_FOUND, [`User with username ${username} was not found`]);
        }

        await this.userRepository.deleteUser(user);

        return prepareResponse(true, true);
    }

    /**
     * 
     * @param username of the user to update the role to
     * @param role of the user to be assigned. Is required and should be either USER or ADMIN
     * @returns a Promise with a MyMovieDbResponse object containing the 'deleted' attribute in it's 'data' attribute
     * 
     */
    async updateUserRole(username: string, role: string): Promise<MyMovieDbResponse<User | null>>  {

        if (!isValidRole(role)) {
            return prepareResponse(null, false, USER_INVALID_ROLE, [`Role ${role} is not a valid role`]);
        }

        const user = await this.userRepository.getUserByUsername(username);

        if (user === null) {
            return prepareResponse(null, false, USER_NOT_FOUND, [`User with username ${username} was not found`]);
        }

        user.role = role;
        user.save();

        return prepareResponse(user, true);

    }

}

export default UserService;

interface UserLoginPayload {
    username: string;
    password: string;
}

interface RegisterLoginUserResponse {
    user: User;
    token: string;
}


/**
 * 
 * @param payload which would be the user register data from request body.
 * This function checks that the required user data to create a new user are present.
 * 
 */
const validateRegisterUserPayload = (payload: UserCreationAttributes): ValidationResult => {
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

const validateLoginUserPayload = (payload: UserLoginPayload): ValidationResult => {

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