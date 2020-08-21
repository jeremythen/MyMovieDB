import Reviewer, { ReviewerAttributes } from '../db/models/movie/Reviewer';

class ReviewerRepository {
    
    async getReviewerById(id: number): Promise<Reviewer | null> {
        return await Reviewer.findOne({ where: { id } });
    }

}

const reviewerRepository = Object.freeze(new ReviewerRepository());

export default reviewerRepository;