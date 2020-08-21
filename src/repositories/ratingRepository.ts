import Rating, { ReviewCreationAttributes } from '../db/models/movie/Review';
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

    async createRating(crateRatingPayload: ReviewCreationAttributes): Promise<Rating> {

        const { reviewerStars, movieId, reviewerId, comment = '' } = crateRatingPayload;

        // Clean copy of specific properties.
        const reviewerData: ReviewCreationAttributes = { reviewerStars, movieId, reviewerId, comment };

        return await Rating.create(reviewerData);
    }

}

const ratingRepository = Object.freeze(new RatingRepository());

export default ratingRepository;