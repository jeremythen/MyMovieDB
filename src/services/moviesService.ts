import moviesRepository from '../repositories/moviesRepository';
import { MovieCreationAttributes } from '../db/models/movie/Movie';
import { ValidationResult } from '../util/util';
import { prepareResponse, MyMovieDbResponse } from '../util/util';
import { MovieError } from '../util/enums';
import { ReviewCreationAttributes } from '../db/models/movie/Review';
import reviewerRepository from '../repositories/reviewerRepository';
import reviewRepository from '../repositories/reviewRepository';

const { MOVIE_INVALID_PAYLOAD,
  MOVIE_INVALID_REVIEW_PAYLOAD, MOVIE_NOT_FOUND, REVIEWER_NOT_FOUND, MOVIE_INVALID_ID, MOVIE_INVALID_OFFSET_LIMIT, MOVIE_INVALID_GET_REVIEW_PAYLOAD, REVIEW_INVALID_ID } = MovieError;

class MovieService {

  async getMovies(): Promise<MyMovieDbResponse> {
    const movies = await moviesRepository.getMoviesWhere({ disabled: false });
    return prepareResponse({ movies }, true);
  }

  async createMovie(movieCreationPayload: MovieCreationAttributes): Promise<MyMovieDbResponse> {

    const validation = validateCreateMoviePayload(movieCreationPayload);

    if (!validation.valid) {
      return prepareResponse(null, false, MOVIE_INVALID_PAYLOAD, validation.validationErrors);
    }

    const movie = await moviesRepository.createMovie(movieCreationPayload);

    return prepareResponse({ movie }, true);

  }

  async addMovieReview(movieId: number, movieReviewPayload: ReviewCreationAttributes): Promise<MyMovieDbResponse> {

    const validation = validateCreateReviewPayload(movieReviewPayload);

    if (!validation.valid) {
      return prepareResponse(null, false, MOVIE_INVALID_REVIEW_PAYLOAD, validation.validationErrors);
    }

    const { reviewerId, reviewerStars, comment = '' } = movieReviewPayload;

    const movie = await moviesRepository.getMovieById(movieId);

    if (movie === null) {
      return prepareResponse(null, false, MOVIE_NOT_FOUND, [`Movie with id ${movieId} was not found`]);
    }

    const reviewer = await reviewerRepository.getReviewerById(reviewerId);

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

  }

  async disableMovie(movieId: number): Promise<MyMovieDbResponse> {

    if (!movieId || movieId < 1) {
      return prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
    }

    const movie = await moviesRepository.getMovieById(movieId);

    if (movie === null) {
      return prepareResponse(null, false, MOVIE_NOT_FOUND, [`Movie with id ${movieId} was not found`]);
    }

    movie.disabled = true;

    movie.save();

    return prepareResponse({ disabled: true }, true);

  }

  async getMovieById(id: number): Promise<MyMovieDbResponse> {

    if (!id || id < 1) {
      return prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
    }

    const movie = await moviesRepository.getMovieByIdAndWhere(id, { disabled: false });

    if (movie === null) {
      return prepareResponse(null, false, MOVIE_NOT_FOUND, [`Movie with id ${id} was not found or is not available`]);
    }

    return prepareResponse({ movie }, true);
  }

  async getMovieReviews(movieId: number) {

    if (!movieId || movieId < 1) {
      return prepareResponse(null, false, MOVIE_INVALID_ID, [`Invalid movie id`]);
    }

    const movies = await reviewRepository.getMovieReviews(movieId);
    return prepareResponse({ movies }, true);
  }

  async getMoviesWithOffsetAndLimit(offset: number, limit: number) {

    if (!isValidPaginationNumber(offset) || !isValidPaginationNumber(limit)) {
      return prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, ['offset and limit are required and must be valid numbers']);
    }

    const movies = await moviesRepository.getMoviesWithOffsetAndLimit(offset, limit);
    return prepareResponse({ movies }, true);
  }

  async getMoviesWithOffset(offset: number) {

    if (!isValidPaginationNumber(offset)) {
      return prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, ['offset is required and must be a valid number']);
    }

    const movies = await moviesRepository.getMoviesWithOffset(offset);
    return prepareResponse({ movies }, true);
  }

  async getMoviesWithLimit(limit: number) {

    if (!isValidPaginationNumber(limit)) {
      return prepareResponse(null, false, MOVIE_INVALID_OFFSET_LIMIT, ['limit is required and must be a valid number']);
    }

    const movies = await moviesRepository.getMoviesWithLimit(limit);
    return prepareResponse({ movies }, true);
  }

  async getReviewByReviewerIdAndMovieId(reviewerId: number, movieId: number): Promise<MyMovieDbResponse>  {

    if (!isValidIdNumber(reviewerId) || !isValidIdNumber(movieId)) {
      return prepareResponse(null, false, MOVIE_INVALID_GET_REVIEW_PAYLOAD, ['reviewerId and movieId are required']);
    }

    const review = await reviewRepository.getReviewByReviewerIdAndMovieId(reviewerId, movieId);

    return prepareResponse({ review }, true);

  }

  async getReviewById(reviewId: number): Promise<MyMovieDbResponse>  {
    if (!isValidIdNumber(reviewId)) {
      return prepareResponse(null, false, REVIEW_INVALID_ID, ['reviewId are required. Please Provide a valid review id']);
    }

    const review = await reviewRepository.getReviewById(reviewId);

    return prepareResponse({ review }, true);
  }

  async getReviewerReviews(reviewerId: number): Promise<MyMovieDbResponse> {
    if (!isValidIdNumber(reviewerId)) {
      return prepareResponse(null, false, MOVIE_INVALID_GET_REVIEW_PAYLOAD, ['reviewerId are required']);
    }

    const reviews = await reviewRepository.getReviewerReviews(reviewerId);

    return prepareResponse({ reviews }, true);
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
  return (!Number.isNaN(number) && number > 0);
}

const isValidRatingStarsNumber = (stars: number): boolean => {
  stars = Number(stars);
  return (!Number.isNaN(stars) && stars > 0 && stars < 6);
}

const isValidIdNumber = (number: number): boolean => {
  number = Number(number);
  return (!Number.isNaN(number) && number > 0);
}