import Movie from '../db/models/movie/Movie';
import { MovieCreationAttributes } from '../db/models/movie/Movie';

class MoviesRepository {
    async getMovies(): Promise<Movie[]> {
        return await Movie.findAll();
    }

    async getMovieById(id: number): Promise<Movie | null> {
        return await Movie.findOne({ where: { id } });
    }

    async createMovie(movieCreationPayload: MovieCreationAttributes): Promise<Movie> {

        const {
            title,
            year,
            country,
            distributor = '',
            time = 0,
            language = '',
            disabled = false,
        } = movieCreationPayload;

        const movie = await Movie.create({
            title,
            year,
            country,
            distributor,
            time,
            language,
            disabled,
        });

        return movie;
        
    }

    async getMoviesWhere(props: object): Promise<Movie[]>  {
        return await Movie.findAll({ where: props });
    }

    async getMovieByIdAndWhere(id: number, props: object): Promise<Movie | null> {
        return await Movie.findOne({ where: { id, ...props } });
    }

}

const moviesRepository = Object.freeze(new MoviesRepository());

export default moviesRepository;