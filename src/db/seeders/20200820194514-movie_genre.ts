"use strict";

import { QueryInterface } from "sequelize";
import envConfig from '../../config/envConfig';
const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const movieGenres = [];

    for (let i = 0; i < seeds; i++) {
      movieGenres.push({
        movieId: i + 1,
        genreId: getRandomGenreId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("movie_genre", movieGenres);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("movie_genre", {}, {});
  },
};

// There are only 24 genres in genres seed
const getRandomGenreId = () => {
  const min = 1;
  const max = 24;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
