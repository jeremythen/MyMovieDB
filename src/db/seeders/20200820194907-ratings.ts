"use strict";

import { QueryInterface } from "sequelize";
import envConfig from '../../config/envConfig';
const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const ratings = [];

    for (let i = 0; i < seeds; i++) {
      ratings.push({
        movieId: i + 1,
        reviewerId: i + 1,
        reviewerStars: getRandomRating(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("ratings", ratings);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("ratings", {}, {});
  },
};

const getRandomRating = () => {
  const min = 1;
  const max = 5;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
