
import connection from "../db/connection";

const GET_ALL_MOVIES_QUERY = "SELECT id, title, year, time, lang, country, created_at FROM movies";;

class MoviesRepository {

    async getMovies() {

        try {

            const response = await new Promise((resolve, reject) => {

                connection.query(GET_ALL_MOVIES_QUERY, (err, result) => {

                  if (err) {
                    return reject(new Error(err.message));
                  }

                  resolve(result);
                });

            });

            return response;

        } catch (err) {
            throw err;
        }

    }

}

const moviesRepository = Object.freeze(new MoviesRepository());

export default moviesRepository;