import Director, { DirectorCreationAttributes } from '../db/models/movie/Director';
import { ValidationResult } from '../util/util';
import { prepareResponse, MyMovieDbResponse, isValidId } from '../util/util';
import { MovieError } from '../util/enums';
import DirectorRepository from '../repositories/DirectorsRepository';

const { DIRECTOR_INVALID_PAYLOAD, DIRECTOR_INVALID_ID, DIRECTOR_NOT_FOUND } = MovieError;

class DirectorService {

    private directorsRepository: DirectorRepository;

    constructor() {
        this.directorsRepository = new DirectorRepository();
    }

    async getDirectors(): Promise<MyMovieDbResponse<Director[]>> {
        const directors = await this.directorsRepository.getDirectors();
        return prepareResponse(directors, true);
    }

    async createDirector(directorCreationPayload: DirectorCreationAttributes): Promise<MyMovieDbResponse<Director | null>> {

        const validation = validateDirectorCreationPayload(directorCreationPayload);

        if (!validation.valid) {
            return prepareResponse(null, false, DIRECTOR_INVALID_PAYLOAD, validation.validationErrors);
        }

        const director = await this.directorsRepository.createDirector(directorCreationPayload);

        return prepareResponse(director, true);

    }

    async getDirectorById(id: number): Promise<MyMovieDbResponse<Director | null>> {

        if (!id || id < 1) {
            return prepareResponse(null, false, DIRECTOR_INVALID_ID, [`Invalid director id`]);
        }

        const director = await this.directorsRepository.getDirectorById(id);

        if (director === null) {
            return prepareResponse(null, false, DIRECTOR_NOT_FOUND, [`Director with id ${id} was not found`]);
        }

        return prepareResponse(director, true);
    }

    async deleteDirectorById(id: number) {

        if (!isValidId(id)) {
            return prepareResponse(null, false, DIRECTOR_INVALID_ID, [`Invalid actor id`]);
        }

        const director = await this.directorsRepository.getDirectorById(id);

        if (director === null) {
            return prepareResponse(null, false, DIRECTOR_NOT_FOUND, [`Director with id ${id} was not found`]);
        }

        director.destroy();

        return prepareResponse({ deleted: true }, true);

    }

}

export default DirectorService;

const validateDirectorCreationPayload = (payload: DirectorCreationAttributes): ValidationResult => {
    const validationResult: ValidationResult = {
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
