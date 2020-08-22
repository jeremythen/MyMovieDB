import moviesRepository from '../repositories/moviesRepository';
import { MovieCreationAttributes } from '../db/models/movie/Movie';
import { ValidationResult } from '../util/util';
import { prepareResponse, MyMovieDbResponse } from '../util/util';
import { MovieError, GeneralError } from '../util/enums';
import { ReviewCreationAttributes } from '../db/models/movie/Review';
import reviewRepository from '../repositories/reviewRepository';
import userRepository from '../repositories/userRepository';
import log4js from 'log4js';

const logger = log4js.getLogger('', );

const { MOVIE_INVALID_PAYLOAD,
  MOVIE_INVALID_REVIEW_PAYLOAD, MOVIE_NOT_FOUND, REVIEWER_NOT_FOUND, MOVIE_INVALID_ID, MOVIE_INVALID_OFFSET_LIMIT, MOVIE_INVALID_GET_REVIEW_PAYLOAD, REVIEW_INVALID_ID } = MovieError;
const { UNKNOWN_ERROR } = GeneralError;

class MovieService {

  /**
   * 
   * Returns the list of movies that are not disabled
   * @returns a Promise with a MyMovieDbResponse object containing the list of 'movies' attribute in it's 'data' attribute
   * 
   */
  async getMovies(): Promise<MyMovieDbResponse> {
    logger.info('getMovies()');
    try {
      const movies = await moviesRepository.getMoviesWhere({ disabled: false });
      return prepareResponse({ movies }, true);
    } catch (error) {
      const message = 'There was an error getting movies';
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }
  }

  /**
   * 
   * @param movieCreationPayload Creates a movie and returns the newly created movie in a MyMovieDbResponse object
   * In the movieCreationPayload payload, the attributes title and year are required
   * @returns a Promise with a MyMovieDbResponse object containing the newly created 'movie' attribute in it's 'data' attribute
   * 
   */
  async createMovie(movieCreationPayload: MovieCreationAttributes): Promise<MyMovieDbResponse> {
    logger.info('Creating movie');
    logger.info('New movie movieCreationPayload', movieCreationPayload);
    try {
      const validation = validateCreateMoviePayload(movieCreationPayload);

      if (!validation.valid) {
        return prepareResponse(null, false, MOVIE_INVALID_PAYLOAD, validation.validationErrors);
      }

      const movie = await moviesRepository.createMovie(movieCreationPayload);

      return prepareResponse({ movie }, true);
    } catch (error) {
      const message = 'There was an error creating the movie';
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }
    
  }

  /**
   * 
   * @param movieId the id of the movie which you would like to add a review to. This parameter is required.
   * @param movieReviewPayload the payload of the Review. movieId, reviewId and reviewerStars are expected and required parameters in this payload.
   * @returns a Promise with a MyMovieDbResponse object containing the newly created 'review' attribute in it's 'data' attribute
   * 
   */
  async addMovieReview(movieId: number, movieReviewPayload: ReviewCreationAttributes): Promise<MyMovieDbResponse> {

    try {
      const validation = validateCreateReviewPayload(movieReviewPayload);

      if (!validation.valid) {
        return prepareResponse(null, false, MOVIE_INVALID_REVIEW_PAYLOAD, validation.validationErrors);
      }

      const { reviewerId, reviewerStars, comment = '' } = movieReviewPayload;

      const movie = await moviesRepository.getMovieById(movieId);

      if (movie === null) {
        return prepareResponse(null, false, MOVIE_NOT_FOUND, [`Movie with id ${movieId} was not found`]);
      }

      const reviewer = await userRepository.getUserById(reviewerId);

      if (reviewer === null) {
        return prepareResponse(null, false, REVIEWER_NOT_FOUND, [`Reviewer with id ${reviewerId} was not found`]);
      }

      const review = await reviewRepository.getReviewByReviewerIdAndMovieId(reviewerId, movieId);

      // If a review under that reviewer and movie ids exists, update it.
      if (review === null) {
        const newReview = await reviewRepository.createReview(movieReviewPayload);
        return prepareResponse({ review: newReview }, true);
      } else {
        review.reviewerStars = reviewerStars;
        review.comment = comment;
        review.save();
        return prepareResponse({ review }, true);
      }

    } catch (error) {
      const message = 'There was an error adding movie review';
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }
    
  }

  /**
   * 
   * @param movieId id of the movie to be disabled.
   * @returns a Promise with a MyMovieDbResponse object containing 'disabled' attribute in it's 'data' attribute
   * 
   */
  async disableMovie(movieId: number): Promise<MyMovieDbResponse> {
    logger.info('Disabling movie with id: ', movieId);
    try {
      if (!movieId || movieId < 1) {
        return prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
      }

      const movie = await moviesRepository.getMovieById(movieId);

      if (movie === null) {
        const message = `Movie with id ${movieId} was not found`
        logger.warn(message);
        return prepareResponse(null, false, MOVIE_NOT_FOUND, [message]);
      }

      movie.disabled = true;

      movie.save();

      return prepareResponse({ disabled: true }, true);
    } catch (error) {
      const message = 'There was an error disabling movie';
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }

  }

  /**
   * 
   * @param id is required.
   * @returns a movie by it's id in a Promise with a MyMovieDbResponse object containing 'movie' attribute in it's 'data' attribute
   * 
   */
  async getMovieById(id: number): Promise<MyMovieDbResponse> {
    logger.info(`getMovieById: ${id}`);
    try {
      if (!id || id < 1) {
        logger.warn(`${MOVIE_INVALID_ID} ${id}`);
        return prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
      }

      const movie = await moviesRepository.getMovieByIdAndWhere(id, { disabled: false });

      if (movie === null) {
        logger.warn(`Movie with id ${id} was not found or is not available. ${MOVIE_NOT_FOUND}`);
        return prepareResponse(null, false, MOVIE_NOT_FOUND, [`Movie with id ${id} was not found or is not available`]);
      }

      logger.info(`getMovieById ${id}. Retrieved? ${movie !== null}`);
      return prepareResponse({ movie }, true);

    } catch (error) {
      const message = `There was an error getting movie by id ${id}:`;
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }
    
  }

  /**
   * 
   * @param movieId 
   * @returns a all the reviews that belong to the movie specify that the movieId
   * with a MyMovieDbResponse object containing the list of 'reviews' attribute in it's 'data' attribute
   * 
   */
  async getMovieReviews(movieId: number): Promise<MyMovieDbResponse> {
    logger.info(`getMovieReviews movieId: ${movieId}`);
    try {
      if (!movieId || movieId < 1) {
        logger.warn(`${MOVIE_INVALID_ID}: ${movieId}`);
        return prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
      }

      const movies = await reviewRepository.getMovieReviews(movieId);
      return prepareResponse({ movies }, true);
    } catch (error) {
      const message = 'There was an error getting movie reviews';
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }

  }

  /**
   * 
   * @param offset, to retrieve movies after the movie on the position number of this offset
   * @param limit, return movies up to this limit
   * 
   * @returns a Promise with a MyMovieDbResponse object containing the list of 'movies' attribute in it's 'data' attribute
   * 
   */
  async getMoviesWithOffsetAndLimit(offset: number, limit: number): Promise<MyMovieDbResponse> {
    logger.info(`getMoviesWithOffsetAndLimit: offset: ${offset}, limit: ${limit}`);
    try {
      if (!isValidPaginationNumber(offset) || !isValidPaginationNumber(limit)) {
        const message = 'offset and limit are required and must be valid numbers';
        logger.warn(`${MOVIE_INVALID_OFFSET_LIMIT}. ${message}`);
        return prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, []);
      }

      const movies = await moviesRepository.getMoviesWithOffsetAndLimit(offset, limit);
      return prepareResponse({ movies }, true);
    } catch (error) {
      const message = 'There was an error getting movies with pagination offset and limit';
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }

  }

  /**
   * 
   * @param offset , to retrieve movies after the movie on the position number of this offset
   * @returns a Promise with a MyMovieDbResponse object containing the list of 'movies' attribute in it's 'data' attribute
   * 
   */
  async getMoviesWithOffset(offset: number) {
    logger.info(`getMoviesWithOffset: ${offset}`);
    try {
      if (!isValidPaginationNumber(offset)) {
        return prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, ['offset is required and must be a valid number']);
      }

      const movies = await moviesRepository.getMoviesWithOffset(offset);
      return prepareResponse({ movies }, true);
    } catch (error) {
      const message = 'There was an error getting movies with pagination offset';
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }

  }

  /**
   * 
   * @param limit, return movies up to this limit
   * @returns a Promise with a MyMovieDbResponse object containing the list of 'movies' attribute in it's 'data' attribute
   * 
   */
  async getMoviesWithLimit(limit: number) {
    logger.info(`getMoviesWithLimit: ${limit}`);
    try {
      if (!isValidPaginationNumber(limit)) {
        return prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, ['limit is required and must be a valid number']);
      }

      const movies = await moviesRepository.getMoviesWithLimit(limit);
      return prepareResponse({ movies }, true);
    } catch (error) {
      const message = 'There was an error getting movies with pagination limit';
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }
    
  }

  /**
   * 
   * @param reviewerId to who the reviews belong to
   * @param movieId of the movie that the user sent the review to
   * @returns a Promise with a MyMovieDbResponse object containing the 'review' attribute in it's 'data' attribute
   * 
   */
  async getReviewByReviewerIdAndMovieId(reviewerId: number, movieId: number): Promise<MyMovieDbResponse>  {
    logger.info(`getReviewByReviewerIdAndMovieId: reviewerId: ${reviewerId}, movieId: ${movieId}`);
    try {
      if (!isValidIdNumber(reviewerId) || !isValidIdNumber(movieId)) {
        logger.warn(`${MOVIE_INVALID_GET_REVIEW_PAYLOAD}. reviewerId and movieId are required`);
        return prepareResponse(null, false, MOVIE_INVALID_GET_REVIEW_PAYLOAD, ['reviewerId and movieId are required']);
      }

      const review = await reviewRepository.getReviewByReviewerIdAndMovieId(reviewerId, movieId);

      return prepareResponse({ review }, true);
    } catch (error) {
      const message = 'There was an error getting movies by reviewer id and movie id';
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }

  }

  /**
   * 
   * @param reviewId the reviewId of the review record
   * @returns a Promise with a MyMovieDbResponse object containing the 'review' attribute in it's 'data' attribute
   * 
   */
  async getReviewById(reviewId: number): Promise<MyMovieDbResponse>  {
    logger.info(`getReviewById: ${reviewId}`);
    try {
      if (!isValidIdNumber(reviewId)) {
        logger.warn(`${REVIEW_INVALID_ID}. reviewId are required. Please Provide a valid review id: ${reviewId}`);
        return prepareResponse(null, false, REVIEW_INVALID_ID, ['reviewId are required. Please Provide a valid review id']);
      }

      const review = await reviewRepository.getReviewById(reviewId);
      logger.info('review:', review);
      return prepareResponse({ review }, true);
    } catch (error) {
      const message = 'There was an error getting review by id';
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }
    
  }

  /**
   * 
   * @param reviewerId the id of the User that made the review
   * @returns a Promise with a MyMovieDbResponse object containing the list of 'reviews' attribute in it's 'data' attribute
   * 
   */
  async getReviewerReviews(reviewerId: number): Promise<MyMovieDbResponse> {
    logger.info(`getReviewerReviews: ${reviewerId}`);
    try {
      if (!isValidIdNumber(reviewerId)) {
        logger.warn(`${MOVIE_INVALID_GET_REVIEW_PAYLOAD}`);
        return prepareResponse(null, false, MOVIE_INVALID_GET_REVIEW_PAYLOAD, ['reviewerId are required']);
      }

      const reviews = await reviewRepository.getReviewerReviews(reviewerId);

      return prepareResponse({ reviews }, true);
    } catch (error) {
      const message = 'There was an error getting review by id';
      logger.error(message, error);
      return prepareResponse(null, false, UNKNOWN_ERROR, [message, error.message]);
    }
    
  }

}


const movieService = Object.freeze(new MovieService());

export default movieService;


/**
 * 
 * @param payload which would be the user register data from request body.
 * This function checks that the required user data to create a new user are present.
 * 
 */
const validateCreateMoviePayload = (payload: MovieCreationAttributes): ValidationResult => {
  const validationResult: ValidationResult = {
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

const validateCreateReviewPayload = (payload: ReviewCreationAttributes): ValidationResult => {
  const validationResult: ValidationResult = {
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

const isValidPaginationNumber = (number: number): boolean => {
  number = Number(number);
  return (!Number.isNaN(number) && number > -1);
}

const isValidRatingStarsNumber = (stars: number): boolean => {
  stars = Number(stars);
  return (!Number.isNaN(stars) && stars > 0 && stars < 6);
}

const isValidIdNumber = (number: number): boolean => {
  number = Number(number);
  return (!Number.isNaN(number) && number > 0);
}