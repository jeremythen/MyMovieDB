import Movie from '../db/models/movie/Movie';
class MoviesRepository {
    async getMovies() {
        try {
            const movies = await Movie.findAll();
            return movies;
        } catch (err) {
            throw err;
        }
    }
}

const moviesRepository = Object.freeze(new MoviesRepository());

export default moviesRepository;