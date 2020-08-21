"use strict";

import { QueryInterface } from "sequelize";
import faker from "faker";
import envConfig from '../../config/envConfig';
const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const reviewers = [];

    for (let i = 0; i < seeds; i++) {
      reviewers.push({
        name: faker.name.findName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("reviewers", reviewers);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("reviewers", {}, {});
  },
};
