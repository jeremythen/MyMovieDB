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
const reviewRepository_1 = __importDefault(require("../repositories/reviewRepository"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const log4js_1 = __importDefault(require("log4js"));
const logger = log4js_1.default.getLogger('');
const { MOVIE_INVALID_PAYLOAD, MOVIE_INVALID_REVIEW_PAYLOAD, MOVIE_NOT_FOUND, REVIEWER_NOT_FOUND, MOVIE_INVALID_ID, MOVIE_INVALID_OFFSET_LIMIT, MOVIE_INVALID_GET_REVIEW_PAYLOAD, REVIEW_INVALID_ID } = enums_1.MovieError;
const { UNKNOWN_ERROR } = enums_1.GeneralError;
class MovieService {
    /**
     *
     * Returns the list of movies that are not disabled
     * @returns a Promise with a MyMovieDbResponse object containing the list of 'movies' attribute in it's 'data' attribute
     *
     */
    getMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('getMovies()');
            try {
                const movies = yield moviesRepository_1.default.getMoviesWhere({ disabled: false });
                return util_1.prepareResponse({ movies }, true);
            }
            catch (error) {
                const message = 'There was an error getting movies';
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
        });
    }
    /**
     *
     * @param movieCreationPayload Creates a movie and returns the newly created movie in a MyMovieDbResponse object
     * In the movieCreationPayload payload, the attributes title and year are required
     * @returns a Promise with a MyMovieDbResponse object containing the newly created 'movie' attribute in it's 'data' attribute
     *
     */
    createMovie(movieCreationPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('Creating movie');
            logger.info('New movie movieCreationPayload', movieCreationPayload);
            try {
                const validation = validateCreateMoviePayload(movieCreationPayload);
                if (!validation.valid) {
                    return util_1.prepareResponse(null, false, MOVIE_INVALID_PAYLOAD, validation.validationErrors);
                }
                const movie = yield moviesRepository_1.default.createMovie(movieCreationPayload);
                return util_1.prepareResponse({ movie }, true);
            }
            catch (error) {
                const message = 'There was an error creating the movie';
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
        });
    }
    /**
     *
     * @param movieId the id of the movie which you would like to add a review to. This parameter is required.
     * @param movieReviewPayload the payload of the Review. movieId, reviewId and reviewerStars are expected and required parameters in this payload.
     * @returns a Promise with a MyMovieDbResponse object containing the newly created 'review' attribute in it's 'data' attribute
     *
     */
    addMovieReview(movieId, movieReviewPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validation = validateCreateReviewPayload(movieReviewPayload);
                if (!validation.valid) {
                    return util_1.prepareResponse(null, false, MOVIE_INVALID_REVIEW_PAYLOAD, validation.validationErrors);
                }
                const { reviewerId, reviewerStars, comment = '' } = movieReviewPayload;
                const movie = yield moviesRepository_1.default.getMovieById(movieId);
                if (movie === null) {
                    return util_1.prepareResponse(null, false, MOVIE_NOT_FOUND, [`Movie with id ${movieId} was not found`]);
                }
                const reviewer = yield userRepository_1.default.getUserById(reviewerId);
                if (reviewer === null) {
                    return util_1.prepareResponse(null, false, REVIEWER_NOT_FOUND, [`Reviewer with id ${reviewerId} was not found`]);
                }
                const review = yield reviewRepository_1.default.getReviewByReviewerIdAndMovieId(reviewerId, movieId);
                // If a review under that reviewer and movie ids exists, update it.
                if (review === null) {
                    const newReview = yield reviewRepository_1.default.createReview(movieReviewPayload);
                    return util_1.prepareResponse({ review: newReview }, true);
                }
                else {
                    review.reviewerStars = reviewerStars;
                    review.comment = comment;
                    review.save();
                    return util_1.prepareResponse({ review }, true);
                }
            }
            catch (error) {
                const message = 'There was an error adding movie review';
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
        });
    }
    /**
     *
     * @param movieId id of the movie to be disabled.
     * @returns a Promise with a MyMovieDbResponse object containing 'disabled' attribute in it's 'data' attribute
     *
     */
    disableMovie(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('Disabling movie with id: ', movieId);
            try {
                if (!movieId || movieId < 1) {
                    return util_1.prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
                }
                const movie = yield moviesRepository_1.default.getMovieById(movieId);
                if (movie === null) {
                    const message = `Movie with id ${movieId} was not found`;
                    logger.warn(message);
                    return util_1.prepareResponse(null, false, MOVIE_NOT_FOUND, [message]);
                }
                movie.disabled = true;
                movie.save();
                return util_1.prepareResponse({ disabled: true }, true);
            }
            catch (error) {
                const message = 'There was an error disabling movie';
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
        });
    }
    /**
     *
     * @param id is required.
     * @returns a movie by it's id in a Promise with a MyMovieDbResponse object containing 'movie' attribute in it's 'data' attribute
     *
     */
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`getMovieById: ${id}`);
            try {
                if (!id || id < 1) {
                    logger.warn(`${MOVIE_INVALID_ID} ${id}`);
                    return util_1.prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
                }
                const movie = yield moviesRepository_1.default.getMovieByIdAndWhere(id, { disabled: false });
                if (movie === null) {
                    logger.warn(`Movie with id ${id} was not found or is not available. ${MOVIE_NOT_FOUND}`);
                    return util_1.prepareResponse(null, false, MOVIE_NOT_FOUND, [`Movie with id ${id} was not found or is not available`]);
                }
                logger.info(`getMovieById ${id}. Retrieved? ${movie !== null}`);
                return util_1.prepareResponse({ movie }, true);
            }
            catch (error) {
                const message = `There was an error getting movie by id ${id}:`;
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
        });
    }
    /**
     *
     * @param movieId
     * @returns a all the reviews that belong to the movie specify that the movieId
     * with a MyMovieDbResponse object containing the list of 'reviews' attribute in it's 'data' attribute
     *
     */
    getMovieReviews(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`getMovieReviews movieId: ${movieId}`);
            try {
                if (!movieId || movieId < 1) {
                    logger.warn(`${MOVIE_INVALID_ID}: ${movieId}`);
                    return util_1.prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
                }
                const movies = yield reviewRepository_1.default.getMovieReviews(movieId);
                return util_1.prepareResponse({ movies }, true);
            }
            catch (error) {
                const message = 'There was an error getting movie reviews';
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
        });
    }
    /**
     *
     * @param offset, to retrieve movies after the movie on the position number of this offset
     * @param limit, return movies up to this limit
     *
     * @returns a Promise with a MyMovieDbResponse object containing the list of 'movies' attribute in it's 'data' attribute
     *
     */
    getMoviesWithOffsetAndLimit(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`getMoviesWithOffsetAndLimit: offset: ${offset}, limit: ${limit}`);
            try {
                if (!isValidPaginationNumber(offset) || !isValidPaginationNumber(limit)) {
                    const message = 'offset and limit are required and must be valid numbers';
                    logger.warn(`${MOVIE_INVALID_OFFSET_LIMIT}. ${message}`);
                    return util_1.prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, []);
                }
                const movies = yield moviesRepository_1.default.getMoviesWithOffsetAndLimit(offset, limit);
                return util_1.prepareResponse({ movies }, true);
            }
            catch (error) {
                const message = 'There was an error getting movies with pagination offset and limit';
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
        });
    }
    /**
     *
     * @param offset , to retrieve movies after the movie on the position number of this offset
     * @returns a Promise with a MyMovieDbResponse object containing the list of 'movies' attribute in it's 'data' attribute
     *
     */
    getMoviesWithOffset(offset) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`getMoviesWithOffset: ${offset}`);
            try {
                if (!isValidPaginationNumber(offset)) {
                    return util_1.prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, ['offset is required and must be a valid number']);
                }
                const movies = yield moviesRepository_1.default.getMoviesWithOffset(offset);
                return util_1.prepareResponse({ movies }, true);
            }
            catch (error) {
                const message = 'There was an error getting movies with pagination offset';
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
        });
    }
    /**
     *
     * @param limit, return movies up to this limit
     * @returns a Promise with a MyMovieDbResponse object containing the list of 'movies' attribute in it's 'data' attribute
     *
     */
    getMoviesWithLimit(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`getMoviesWithLimit: ${limit}`);
            try {
                if (!isValidPaginationNumber(limit)) {
                    return util_1.prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, ['limit is required and must be a valid number']);
                }
                const movies = yield moviesRepository_1.default.getMoviesWithLimit(limit);
                return util_1.prepareResponse({ movies }, true);
            }
            catch (error) {
                const message = 'There was an error getting movies with pagination limit';
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
        });
    }
    /**
     *
     * @param reviewerId to who the reviews belong to
     * @param movieId of the movie that the user sent the review to
     * @returns a Promise with a MyMovieDbResponse object containing the 'review' attribute in it's 'data' attribute
     *
     */
    getReviewByReviewerIdAndMovieId(reviewerId, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`getReviewByReviewerIdAndMovieId: reviewerId: ${reviewerId}, movieId: ${movieId}`);
            try {
                if (!isValidIdNumber(reviewerId) || !isValidIdNumber(movieId)) {
                    logger.warn(`${MOVIE_INVALID_GET_REVIEW_PAYLOAD}. reviewerId and movieId are required`);
                    return util_1.prepareResponse(null, false, MOVIE_INVALID_GET_REVIEW_PAYLOAD, ['reviewerId and movieId are required']);
                }
                const review = yield reviewRepository_1.default.getReviewByReviewerIdAndMovieId(reviewerId, movieId);
                return util_1.prepareResponse({ review }, true);
            }
            catch (error) {
                const message = 'There was an error getting movies by reviewer id and movie id';
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
        });
    }
    /**
     *
     * @param reviewId the reviewId of the review record
     * @returns a Promise with a MyMovieDbResponse object containing the 'review' attribute in it's 'data' attribute
     *
     */
    getReviewById(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`getReviewById: ${reviewId}`);
            try {
                if (!isValidIdNumber(reviewId)) {
                    logger.warn(`${REVIEW_INVALID_ID}. reviewId are required. Please Provide a valid review id: ${reviewId}`);
                    return util_1.prepareResponse(null, false, REVIEW_INVALID_ID, ['reviewId are required. Please Provide a valid review id']);
                }
                const review = yield reviewRepository_1.default.getReviewById(reviewId);
                logger.info('review:', review);
                return util_1.prepareResponse({ review }, true);
            }
            catch (error) {
                const message = 'There was an error getting review by id';
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
        });
    }
    /**
     *
     * @param reviewerId the id of the User that made the review
     * @returns a Promise with a MyMovieDbResponse object containing the list of 'reviews' attribute in it's 'data' attribute
     *
     */
    getReviewerReviews(reviewerId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`getReviewerReviews: ${reviewerId}`);
            try {
                if (!isValidIdNumber(reviewerId)) {
                    logger.warn(`${MOVIE_INVALID_GET_REVIEW_PAYLOAD}`);
                    return util_1.prepareResponse(null, false, MOVIE_INVALID_GET_REVIEW_PAYLOAD, ['reviewerId are required']);
                }
                const reviews = yield reviewRepository_1.default.getReviewerReviews(reviewerId);
                return util_1.prepareResponse({ reviews }, true);
            }
            catch (error) {
                const message = 'There was an error getting review by id';
                logger.error(message, error);
                return util_1.prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
            }
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
    if (!isValidRatingStarsNumber(reviewerStars)) {
        validationResult.validationErrors.push("reviewerStars is required and should be from 1 to 5");
    }
    return validationResult;
};
const isValidPaginationNumber = (number) => {
    number = Number(number);
    return (!Number.isNaN(number) && number > -1);
};
const isValidRatingStarsNumber = (stars) => {
    stars = Number(stars);
    return (!Number.isNaN(stars) && stars > 0 && stars < 6);
};
const isValidIdNumber = (number) => {
    number = Number(number);
    return (!Number.isNaN(number) && number > 0);
};
