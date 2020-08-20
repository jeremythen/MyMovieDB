"use strict";

import { QueryInterface } from "sequelize";
import faker from "faker";
import envConfig from '../../config/envConfig';
const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const actors = [];

    for (let i = 0; i < seeds; i++) {
      actors.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      });
    }

    await queryInterface.bulkInsert("actors", actors);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("actors", {}, {});
  },
};
