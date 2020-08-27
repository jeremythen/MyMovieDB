process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import MovieService from '../services/MovieService';
import sequelize from '../db/connection';
import { ReviewCreationAttributes } from '../db/models/movie/Review';
import Movie from '../db/models/movie/Movie';

const movieService = new MovieService();

before(function () {
    // 
});

describe('Movies', () => {

    describe('Getting movies', () => {

        it('should return a list of movies', async () => {
            const response = await movieService.getMovies();

            expect(response === null).to.be.false;

            expect(response.success).to.be.true;

            expect(Array.isArray(response.data)).to.be.true;
        });

        it('should return a movie when searched by movie id', async () => {

            const response = await movieService.getMovieById(1);

            expect(response === null).to.be.false;

            expect(response.success).to.be.true;

            expect(response.data).to.not.be.null;
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

            expect(response.data, 'Expecting new movie to be present in the response').to.not.be.null;

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

            expect(response.data, 'Expecting new movie to be present in the response').to.not.be.null;

            const movie = <Movie>response.data;

            const newMovieId = movie.id;

            const response2 = await movieService.getMovieById(movie.id);

            expect(response === null, 'Expecting response to not be null').to.be.false;

            expect(response.success, 'Expecting response to be successful').to.be.true;

            expect(response.data, 'Expecting new movie to be present in the response').to.not.be.null;

            const movie2 = <Movie>response2.data;

            console.log('movie ids', newMovieId, movie2.id);

            expect(newMovieId === movie2.id, 'Expecting to find the newly created movie by id').to.be.true;

        });

    });


    describe('Reviews', () => {

        it('Adding a movie review', async () => {

            const movieId = 1;

            const reviewCreationPayload: ReviewCreationAttributes = {movieId, reviewerId: 1, reviewerStars: 5};

            const response = await movieService.addMovieReview(movieId, reviewCreationPayload);

            expect(response.success, 'Expecting response to be successful').to.be.true;

            const review = response.data;

            expect(review, 'Expecting the review to be added.').to.not.be.null;

        });

    });

});