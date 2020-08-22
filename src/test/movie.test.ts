process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import moviesService from '../services/moviesService';
import sequelize from '../db/connection';

before(function () {
    sequelize.models.Movie.destroy({ where: {}, truncate: true });
});

describe('Movies tests', () => {
    it('Get movies response has an array of movies', async () => {
        const response = await moviesService.getMovies();
        console.log('response', response)

        expect(response === null).to.be.false;

        expect(response.success).to.be.true;

        expect(Array.isArray(response.data.movies)).to.be.true;
    });
});

describe('Add movie', () => {

    it('Adding a movie', async () => {

        const moviePayload = {
            title: "My new movie",
            year: 2018,
            time: 135,
            language: "English",
            country: "RD",
            distributor: "Universal Pictures"
        };

        const response = await moviesService.createMovie(moviePayload);

        expect(response === null, 'Expecting response to not be null').to.be.false;

        expect(response.success, 'Expecting response to be successful').to.be.true;

        expect(response.data.movie, 'Expecting new movie to be present in the response').to.not.be.null;

    });

    it('Adding a movie and getting it by id', async () => {

        const moviePayload = {
            title: "MyNewlyAddedMovie",
            year: 2018,
            time: 135,
            language: "English",
            country: "RD",
            distributor: "Universal Pictures"
        };

        const response = await moviesService.createMovie(moviePayload);

        expect(response === null, 'Expecting response to not be null').to.be.false;

        expect(response.success, 'Expecting response to be successful').to.be.true;

        expect(response.data.movie, 'Expecting new movie to be present in the response').to.not.be.null;

        const movie = response.data.movie;
        console.log('movie id', movie);
        const newMovieId = movie.id;

        const response2 = await moviesService.getMovieById(movie.id);

        expect(response === null, 'Expecting response to not be null').to.be.false;

        expect(response.success, 'Expecting response to be successful').to.be.true;

        expect(response.data.movie, 'Expecting new movie to be present in the response').to.not.be.null;

        const movie2 = response2.data.movie;

        console.log('movie ids', newMovieId, movie2.id);

        expect(newMovieId === movie2.id, 'Expecting to find the newly created movie by id').to.be.true;

    });


});



