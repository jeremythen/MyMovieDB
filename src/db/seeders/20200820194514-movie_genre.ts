"use strict";

import { QueryInterface } from "sequelize";
import envConfig from '../../config/envConfig';
import MovieGenre from '../models/movie/MovieGenre';

const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const movieGenres = [];

    for (let i = 1; i <= seeds; i++) {
      movieGenres.push({
        movieId: i,
        genreId: getRandomGenreId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert(MovieGenre.tableName, movieGenres);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(MovieGenre.tableName, {}, {});
  },
};

// There are only 24 genres in genres seed
const getRandomGenreId = () => {
  const min = 1;
  const max = 24;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
