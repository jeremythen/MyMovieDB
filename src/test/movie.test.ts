process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import MovieService from '../services/MovieService';
import sequelize from '../db/connection';
//import { runMigrations } from '../util/test/test-util';

const Movie = sequelize.models.Movie;

const movieService = new MovieService();

before(function () {

    // Should be first movie in with id 1
    Movie.create({
        title: "MyNewlyAddedMovie1",
        year: 2018,
        time: 135,
        language: "English",
        country: "RD",
        distributor: "Universal Pictures"
    });

    // Second movie with id 2
    Movie.create({
        title: "MyNewlyAddedMovie2",
        year: 2020,
        time: 135,
        language: "English",
        country: "RD",
        distributor: "Universal Pictures"
    });

});

describe('Movies', () => {

    describe('Getting movies', () => {

        it('should return a list of movies', async () => {
            const response = await movieService.getMovies();

            expect(response === null).to.be.false;

            expect(response.success).to.be.true;

            expect(Array.isArray(response.data.movies)).to.be.true;
        });

        it('should return a movie when searched by movie id', async () => {

            const response = await movieService.getMovieById(1);

            expect(response === null).to.be.false;

            expect(response.success).to.be.true;

            expect(response.data.movie).to.not.be.null;
        });

    });


    describe('Adding movies', () => {

        it('Adding a movie', async () => {

            const moviePayload = {
                title: "My new movie",
                year: 2018,
                time: 135,
                language: "English",
                country: "RD",
                distributor: "Universal Pictures"
            };

            const response = await movieService.createMovie(moviePayload);

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

            const response = await movieService.createMovie(moviePayload);

            expect(response === null, 'Expecting response to not be null').to.be.false;

            expect(response.success, 'Expecting response to be successful').to.be.true;

            expect(response.data.movie, 'Expecting new movie to be present in the response').to.not.be.null;

            const movie = response.data.movie;

            const newMovieId = movie.id;

            const response2 = await movieService.getMovieById(movie.id);

            expect(response === null, 'Expecting response to not be null').to.be.false;

            expect(response.success, 'Expecting response to be successful').to.be.true;

            expect(response.data.movie, 'Expecting new movie to be present in the response').to.not.be.null;

            const movie2 = response2.data.movie;

            console.log('movie ids', newMovieId, movie2.id);

            expect(newMovieId === movie2.id, 'Expecting to find the newly created movie by id').to.be.true;

        });

    });

});