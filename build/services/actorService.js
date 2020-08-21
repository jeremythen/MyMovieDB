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
const actorsRepository_1 = __importDefault(require("../repositories/actorsRepository"));
const util_1 = require("../util/util");
const enums_1 = require("../util/enums");
const { ACTOR_INVALID_PAYLOAD, ACTOR_INVALID_ID, ACTOR_NOT_FOUND } = enums_1.MovieError;
class ActorService {
    getActors() {
        return __awaiter(this, void 0, void 0, function* () {
            const actors = yield actorsRepository_1.default.getActors();
            return util_1.prepareResponse({ actors }, true);
        });
    }
    createActor(actorCreationPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = validateActorCreationPayload(actorCreationPayload);
            if (!validation.valid) {
                return util_1.prepareResponse(null, false, ACTOR_INVALID_PAYLOAD, validation.validationErrors);
            }
            const actor = yield actorsRepository_1.default.createActor(actorCreationPayload);
            return util_1.prepareResponse({ actor }, true);
        });
    }
    getActorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || id < 1) {
                return util_1.prepareResponse(null, false, ACTOR_INVALID_ID, [`Invalid actor id`]);
            }
            const actor = yield actorsRepository_1.default.getActorById(id);
            if (actor === null) {
                return util_1.prepareResponse(null, false, ACTOR_NOT_FOUND, [`Actor with id ${id} was not found`]);
            }
            return util_1.prepareResponse({ actor }, true);
        });
    }
}
const actorService = Object.freeze(new ActorService());
exports.default = actorService;
const validateActorCreationPayload = (payload) => {
    const validationResult = {
        valid: false,
        validationErrors: [],
    };
    if (!payload) {
        validationResult.valid = false;
        validationResult.validationErrors.push("Actor's first and last names are required");
        return validationResult;
    }
    const { firstName, lastName } = payload;
    if (firstName && lastName) {
        validationResult.valid = true;
        return validationResult;
    }
    if (!firstName) {
        validationResult.validationErrors.push("Actor's first name is required");
    }
    if (!lastName) {
        validationResult.validationErrors.push("Actor's last name is required");
    }
    return validationResult;
};
