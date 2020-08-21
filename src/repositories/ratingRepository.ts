import Rating, { RatingCreationAttributes } from '../db/models/movie/Rating';
import { ValidationResult } from '../util/util';

class RatingRepository {

    async getRatingByReviewerIdAndMovieId(reviewerId: number, movieId: number): Promise<Rating | null> {
        return await Rating.findOne({ where: { reviewerId, movieId } });
    }

    async getReviewerRatings(reviewerId: number): Promise<Rating[]> {
        return await Rating.findAll({ where: { reviewerId } });
    }

    async getMovieRatings(movieId: number): Promise<Rating[]> {
        return await Rating.findAll({ where: { movieId } });
    }

    async createRating(crateRatingPayload: RatingCreationAttributes): Promise<Rating> {

        const { reviewerStars, movieId, reviewerId, comment = '' } = crateRatingPayload;

        // Clean copy of specific properties.
        const reviewerData: RatingCreationAttributes = { reviewerStars, movieId, reviewerId, comment };

        return await Rating.create(reviewerData);
    }

}

const ratingRepository = Object.freeze(new RatingRepository());

export default ratingRepository;