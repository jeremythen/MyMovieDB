import moviesRepository from '../repositories/moviesRepository';

class MovieService {

  async getMovies() {
    const movies = await moviesRepository.getMovies();
    return movies;
  }
}

const movieService = Object.freeze(new MovieService());

export default movieService;