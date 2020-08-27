import ActorRepository from '../repositories/ActorRepository';
import Actor, { ActorCreationAttributes } from '../db/models/movie/Actor';
import { ValidationResult } from '../util/util';
import { prepareResponse, MyMovieDbResponse, isValidId } from '../util/util';
import { MovieError, GeneralError } from '../util/enums';
import log4js from 'log4js';

const logger = log4js.getLogger();

const { ACTOR_INVALID_PAYLOAD, ACTOR_INVALID_ID, ACTOR_NOT_FOUND } = MovieError;
const { ERROR } = GeneralError;

class ActorService {

    private actorRepository: ActorRepository;

    constructor() {
        this.actorRepository = new ActorRepository();
    }

    async getActors(): Promise<MyMovieDbResponse<Actor[] | null>> {
        try {
            logger.info("getActors");
            const actors = await this.actorRepository.getActors();
            return prepareResponse(actors, true);
        } catch (error) {
            return prepareResponse(null, false, ERROR, ['Error getting authors', error.message]);
        }
        
    }

    async createActor(actorCreationPayload: ActorCreationAttributes): Promise<MyMovieDbResponse<Actor | null>> {
        logger.info("createActor actorCreationPayload: ", actorCreationPayload);
        const validation = validateActorCreationPayload(actorCreationPayload);

        if (!validation.valid) {
            logger.error("actorCreationPayload is invalid: ", validation);
            return prepareResponse(null, false, ACTOR_INVALID_PAYLOAD, validation.validationErrors);
        }

        const actor = await this.actorRepository.createActor(actorCreationPayload);
        logger.info("new actor id: ", actor.id);

        return prepareResponse(actor, true);

    }

    async getActorById(id: number): Promise<MyMovieDbResponse<Actor | null>> {
        logger.info(`getActorById: ${id}`);
        if (!id || id < 1) {
            return prepareResponse(null, false, ACTOR_INVALID_ID, [`Invalid actor id`]);
        }

        const actor = await this.actorRepository.getActorById(id);

        if (actor === null) {
            logger.error(`Actor with id ${id} was not found`);
            return prepareResponse(null, false, ACTOR_NOT_FOUND, [`Actor with id ${id} was not found`]);
        }

        return prepareResponse(actor, true);
    }

    async deleteActorById(id: number) {
        logger.info(`deleteActorById: ${id}`);
        if (!isValidId(id)) {
            logger.info(`Invalid actor id`);
            return prepareResponse(null, false, ACTOR_INVALID_ID, [`Invalid actor id`]);
        }

        const actor = await this.actorRepository.getActorById(id);

        if (actor === null) {
            logger.error(`Actor with id ${id} was not found`);
            return prepareResponse(null, false, ACTOR_NOT_FOUND, [`Actor with id ${id} was not found`]);
        }

        actor.destroy();

        return prepareResponse({ deleted: true }, true);

    }

}

export default ActorService;

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
