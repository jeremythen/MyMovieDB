"use strict";

import { QueryInterface } from "sequelize";
import faker from "faker";
import envConfig from '../../config/envConfig';
import Director from '../models/movie/Director';

const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const directors = [];

    for (let i = 0; i < seeds; i++) {
      directors.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert(Director.tableName, directors);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(Director.tableName, {}, {});
  },
};
