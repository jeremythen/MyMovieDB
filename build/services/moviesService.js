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
const moviesRepository_1 = __importDefault(require("../repositories/moviesRepository"));
const util_1 = require("../util/util");
const enums_1 = require("../util/enums");
const reviewerRepository_1 = __importDefault(require("../repositories/reviewerRepository"));
const ratingRepository_1 = __importDefault(require("../repositories/ratingRepository"));
const { MOVIE_INVALID_PAYLOAD, MOVIE_INVALID_REVIEW_PAYLOAD, MOVIE_NOT_FOUND, REVIEWER_NOT_FOUND, MOVIE_INVALID_ID, MOVIE_INVALID_OFFSET_LIMIT } = enums_1.MovieError;
class MovieService {
    getMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            const movies = yield moviesRepository_1.default.getMoviesWhere({ disabled: false });
            return util_1.prepareResponse({ movies }, true);
        });
    }
    createMovie(movieCreationPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = validateCreateMoviePayload(movieCreationPayload);
            if (!validation.valid) {
                return util_1.prepareResponse(null, false, MOVIE_INVALID_PAYLOAD, validation.validationErrors);
            }
            const movie = yield moviesRepository_1.default.createMovie(movieCreationPayload);
            return util_1.prepareResponse({ movie }, true);
        });
    }
    addMovieReview(movieReviewPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = validateCreateReviewPayload(movieReviewPayload);
            if (!validation.valid) {
                return util_1.prepareResponse(null, false, MOVIE_INVALID_REVIEW_PAYLOAD, validation.validationErrors);
            }
            const { movieId, reviewerId } = movieReviewPayload;
            const movie = yield moviesRepository_1.default.getMovieById(movieId);
            if (movie === null) {
                return util_1.prepareResponse(null, false, MOVIE_NOT_FOUND, [`Movie with id ${movieId} was not found`]);
            }
            const reviewer = yield reviewerRepository_1.default.getReviewerById(reviewerId);
            if (movie === null) {
                return util_1.prepareResponse(null, false, REVIEWER_NOT_FOUND, [`Reviewer with id ${reviewerId} was not found`]);
            }
            const rating = yield ratingRepository_1.default.createRating(movieReviewPayload);
            return util_1.prepareResponse({ rating }, true);
        });
    }
    disableMovie(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!movieId || movieId < 1) {
                return util_1.prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
            }
            const movie = yield moviesRepository_1.default.getMovieById(movieId);
            if (movie === null) {
                return util_1.prepareResponse(null, false, MOVIE_NOT_FOUND, [`Movie with id ${movieId} was not found`]);
            }
            movie.disabled = true;
            movie.save();
            return util_1.prepareResponse({ disabled: true }, true);
        });
    }
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || id < 1) {
                return util_1.prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
            }
            const movie = yield moviesRepository_1.default.getMovieByIdAndWhere(id, { disabled: false });
            if (movie === null) {
                return util_1.prepareResponse(null, false, MOVIE_NOT_FOUND, [`Movie with id ${id} was not found or is not available`]);
            }
            console.log('movie', movie);
            console.log('movie casts', yield movie.getCasts());
            console.log('movie directors', yield movie.getDirectors());
            console.log('movie genre', yield movie.getGenres());
            console.log('movie ratings', yield movie.getRatings());
            return util_1.prepareResponse({ movie }, true);
        });
    }
    getMovieReviews(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!movieId || movieId < 1) {
                return util_1.prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
            }
            const movies = yield ratingRepository_1.default.getMovieRatings(movieId);
            return util_1.prepareResponse({ movies }, true);
        });
    }
    getMoviesWithOffsetAndLimit(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isValidPaginationNumber(offset) || !isValidPaginationNumber(limit)) {
                return util_1.prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, ['offset and limit are required and must be valid numbers']);
            }
            const movies = yield moviesRepository_1.default.getMoviesWithOffsetAndLimit(offset, limit);
            return util_1.prepareResponse({ movies }, true);
        });
    }
    getMoviesWithOffset(offset) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isValidPaginationNumber(offset)) {
                return util_1.prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, ['offset is required and must be a valid number']);
            }
            const movies = yield moviesRepository_1.default.getMoviesWithOffset(offset);
            return util_1.prepareResponse({ movies }, true);
        });
    }
    getMoviesWithLimit(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isValidPaginationNumber(limit)) {
                return util_1.prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, ['limit is required and must be a valid number']);
            }
            const movies = yield moviesRepository_1.default.getMoviesWithLimit(limit);
            return util_1.prepareResponse({ movies }, true);
        });
    }
}
const movieService = Object.freeze(new MovieService());
exports.default = movieService;
/**
 *
 * @param payload which would be the user register data from request body.
 * This function checks that the required user data to create a new user are present.
 *
 */
const validateCreateMoviePayload = (payload) => {
    const validationResult = {
        valid: false,
        validationErrors: [],
    };
    if (!payload) {
        validationResult.valid = false;
        validationResult.validationErrors.push("No movie payload was provided");
        return validationResult;
    }
    const { title, year } = payload;
    if (title && year > 0) {
        validationResult.valid = true;
        return validationResult;
    }
    if (!title) {
        validationResult.validationErrors.push("title is required");
    }
    if (!year || year < 1) {
        validationResult.validationErrors.push("year is required");
    }
    return validationResult;
};
const validateCreateReviewPayload = (payload) => {
    const validationResult = {
        valid: false,
        validationErrors: [],
    };
    if (!payload) {
        validationResult.valid = false;
        validationResult.validationErrors.push("No movie review payload was provided");
        return validationResult;
    }
    const { movieId, reviewerId, reviewerStars } = payload;
    if (movieId > 0 && reviewerId > 0 && reviewerStars > 0 && reviewerStars < 6) {
        validationResult.valid = true;
        return validationResult;
    }
    if (!movieId) {
        validationResult.validationErrors.push("movieId is required");
    }
    if (!reviewerId) {
        validationResult.validationErrors.push("reviewerId is required");
    }
    if (reviewerStars < 0 || reviewerStars > 5) {
        validationResult.validationErrors.push("reviewerStars is required and should be from 1 to 5");
    }
    return validationResult;
};
const isValidPaginationNumber = (number) => {
    number = Number(number);
    return (!Number.isNaN(number) && number > 0);
};
