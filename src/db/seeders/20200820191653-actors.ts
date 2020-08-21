"use strict";

import { QueryInterface } from "sequelize";
import faker from "faker";
import envConfig from '../../config/envConfig';
import Actor from '../models/movie/Actor';

const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const actors = [];

    for (let i = 0; i < seeds; i++) {
      actors.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert(Actor.tableName, actors);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(Actor.tableName, {}, {});
  },
};
