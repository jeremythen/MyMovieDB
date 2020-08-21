"use strict";

import { QueryInterface } from "sequelize";
import envConfig from '../../config/envConfig';
const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const movieDirectors = [];

    for (let i = 0; i < seeds; i++) {
      movieDirectors.push({
        directorId: i + 1,
        movieId: i + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("movie_direction", movieDirectors);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("movie_direction", {}, {});
  },
};