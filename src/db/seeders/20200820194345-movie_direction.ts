"use strict";

import { QueryInterface } from "sequelize";
import envConfig from '../../config/envConfig';
import MovieDirection from '../models/movie/MovieDirection';

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

    await queryInterface.bulkInsert(MovieDirection.tableName, movieDirectors);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(MovieDirection.tableName, {}, {});
  },
};