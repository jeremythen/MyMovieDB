"use strict";

import { QueryInterface } from "sequelize";
import faker from "faker";
import envConfig from '../../config/envConfig';
const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const directors = [];

    for (let i = 0; i < seeds; i++) {
      directors.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      });
    }

    await queryInterface.bulkInsert("directors", directors);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("directors", {}, {});
  },
};
