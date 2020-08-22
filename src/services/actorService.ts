import actorsRepository from '../repositories/actorsRepository';
import { ActorCreationAttributes } from '../db/models/movie/Actor';
import { ValidationResult } from '../util/util';
import { prepareResponse, MyMovieDbResponse, isValidId } from '../util/util';
import { MovieError } from '../util/enums';

const { ACTOR_INVALID_PAYLOAD, ACTOR_INVALID_ID, ACTOR_NOT_FOUND } = MovieError;

class ActorService {

    async getActors(): Promise<MyMovieDbResponse> {
        const actors = await actorsRepository.getActors();
        return prepareResponse({ actors }, true);
    }

    async createActor(actorCreationPayload: ActorCreationAttributes): Promise<MyMovieDbResponse> {

        const validation = validateActorCreationPayload(actorCreationPayload);

        if (!validation.valid) {
            return prepareResponse(null, false, ACTOR_INVALID_PAYLOAD, validation.validationErrors);
        }

        const actor = await actorsRepository.createActor(actorCreationPayload);

        return prepareResponse({ actor }, true);

    }

    async getActorById(id: number): Promise<MyMovieDbResponse> {

        if (!id || id < 1) {
            return prepareResponse(null, false, ACTOR_INVALID_ID, [`Invalid actor id`]);
        }

        const actor = await actorsRepository.getActorById(id);

        if (actor === null) {
            return prepareResponse(null, false, ACTOR_NOT_FOUND, [`Actor with id ${id} was not found`]);
        }

        return prepareResponse({ actor }, true);
    }

    async deleteActorById(id: number) {

        if (!isValidId(id)) {
            return prepareResponse(null, false, ACTOR_INVALID_ID, [`Invalid actor id`]);
        }

        const actor = await actorsRepository.getActorById(id);

        if (actor === null) {
            return prepareResponse(null, false, ACTOR_NOT_FOUND, [`Actor with id ${id} was not found`]);
        }

        actor.destroy();

        return prepareResponse({ deleted: true }, true);

    }

}


const actorService = Object.freeze(new ActorService());

export default actorService;

const validateActorCreationPayload = (payload: ActorCreationAttributes): ValidationResult => {
    const validationResult: ValidationResult = {
        valid: false,
        validationErrors: [],
    };

    if (!payload) {
        validationResult.valid = false;
        validationResult.validationErrors.push("Actor's first and last names are required");
        return validationResult;
    }

    const { firstName, lastName} = payload;

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
