import Review, { ReviewCreationAttributes } from '../db/models/movie/Review';
class ReviewRepository {

    async getReviewByReviewerIdAndMovieId(reviewerId: number, movieId: number): Promise<Review | null> {
        return await Review.findOne({ where: { reviewerId, movieId } });
    }

    async getReviewerReviews(reviewerId: number): Promise<Review[]> {
        return await Review.findAll({ where: { reviewerId } });
    }

    async getMovieReviews(movieId: number): Promise<Review[]> {
        return await Review.findAll({ where: { movieId } });
    }

    async createReview(crateReviewPayload: ReviewCreationAttributes): Promise<Review> {

        const { reviewerStars, movieId, reviewerId, comment = '' } = crateReviewPayload;

        // Clean copy of specific properties.
        const reviewerData: ReviewCreationAttributes = { reviewerStars, movieId, reviewerId, comment };

        return await Review.create(reviewerData);
    }

    async getReviewById(id: number) {
        return await Review.findOne({ where: { id } });
    }

}

const reviewRepository = Object.freeze(new ReviewRepository());

export default reviewRepository;