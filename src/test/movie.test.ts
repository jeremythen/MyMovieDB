process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import moviesService from '../services/moviesService';
import sequelize from '../db/connection';

beforeEach(function () {
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

