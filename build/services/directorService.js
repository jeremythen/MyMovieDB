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
const directorRepository_1 = __importDefault(require("../repositories/directorRepository"));
const util_1 = require("../util/util");
const enums_1 = require("../util/enums");
const { DIRECTOR_INVALID_PAYLOAD, DIRECTOR_INVALID_ID, DIRECTOR_NOT_FOUND } = enums_1.MovieError;
class DirectorService {
    getDirectors() {
        return __awaiter(this, void 0, void 0, function* () {
            const directors = yield directorRepository_1.default.getDirectors();
            return util_1.prepareResponse({ directors }, true);
        });
    }
    createDirector(directorCreationPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = validateDirectorCreationPayload(directorCreationPayload);
            if (!validation.valid) {
                return util_1.prepareResponse(null, false, DIRECTOR_INVALID_PAYLOAD, validation.validationErrors);
            }
            const director = yield directorRepository_1.default.createDirector(directorCreationPayload);
            return util_1.prepareResponse({ director }, true);
        });
    }
    getDirectorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || id < 1) {
                return util_1.prepareResponse(null, false, DIRECTOR_INVALID_ID, [`Invalid director id`]);
            }
            const director = yield directorRepository_1.default.getDirectorById(id);
            if (director === null) {
                return util_1.prepareResponse(null, false, DIRECTOR_NOT_FOUND, [`Director with id ${id} was not found`]);
            }
            return util_1.prepareResponse({ director }, true);
        });
    }
    deleteDirectorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!util_1.isValidId(id)) {
                return util_1.prepareResponse(null, false, DIRECTOR_INVALID_ID, [`Invalid actor id`]);
            }
            const director = yield directorRepository_1.default.getDirectorById(id);
            if (director === null) {
                return util_1.prepareResponse(null, false, DIRECTOR_NOT_FOUND, [`Director with id ${id} was not found`]);
            }
            director.destroy();
            return util_1.prepareResponse({ deleted: true }, true);
        });
    }
}
const directorService = Object.freeze(new DirectorService());
exports.default = directorService;
const validateDirectorCreationPayload = (payload) => {
    const validationResult = {
        valid: false,
        validationErrors: [],
    };
    if (!payload) {
        validationResult.valid = false;
        validationResult.validationErrors.push("Director's first and last names are required");
        return validationResult;
    }
    const { firstName, lastName } = payload;
    if (firstName && lastName) {
        validationResult.valid = true;
        return validationResult;
    }
    if (!firstName) {
        validationResult.validationErrors.push("Director's first name is required");
    }
    if (!lastName) {
        validationResult.validationErrors.push("Director's last name is required");
    }
    return validationResult;
};
