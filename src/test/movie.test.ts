import { expect } from 'chai';
import moviesService from '../services/moviesService';

describe('Movies tests', () => {
    it('show return hello world', async () => {
        const movies = await moviesService.getMovies();
        expect(Array.isArray(movies)).to.be.true;
    });
});