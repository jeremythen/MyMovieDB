import Movie from '../db/models/movie/Movie';
import { MovieCreationAttributes } from '../db/models/movie/Movie';

const { casts, directors, genres } = Movie.associations;

class MoviesRepository {
    async getMovies(): Promise<Movie[]> {
        return await Movie.findAll({ include: [casts, directors, genres] });
    }

    async getMovieById(id: number): Promise<Movie | null> {
        return await Movie.findOne({ where: { id }, include: [casts, directors, genres] });
    }

    async getMoviesWhere(props: object): Promise<Movie[]>  {
        return await Movie.findAll({ where: props, include: [casts, directors, genres] });
    }

    async getMovieByIdAndWhere(id: number, props: object): Promise<Movie | null> {
        return await Movie.findOne({
            where: { id, ...props },
            include: [casts, directors, genres],
        });
    }

    async getMoviesWithOffsetAndLimit(offset: number, limit: number) {
        return await Movie.findAll({ offset, limit, include: [casts, directors, genres] });
    }

    async getMoviesWithOffset(offset: number) {
        return await Movie.findAll({ offset, include: [casts, directors, genres] });
    }

    async getMoviesWithLimit(limit: number) {
        return await Movie.findAll({ limit, include: [casts, directors, genres] });
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

}

export default MoviesRepository;