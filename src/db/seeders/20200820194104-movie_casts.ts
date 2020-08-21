"use strict";

import { QueryInterface } from "sequelize";
import faker from "faker";
import envConfig from '../../config/envConfig';
import MovieCast from '../models/movie/MovieCast';

const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const movieCasts = [];

    for (let i = 0; i < seeds; i++) {
      movieCasts.push({
        actorId: i + 1,
        movieId: i + 1,
        role: faker.name.findName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert(MovieCast.tableName, movieCasts);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(MovieCast.tableName, {}, {});
  },
};