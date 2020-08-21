"use strict";

import { QueryInterface } from "sequelize";
import envConfig from '../../config/envConfig';
import Review from '../models/movie/Review';

const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const ratings = [];

    for (let i = 1; i <= seeds; i++) {
      ratings.push({
        movieId: i,
        reviewerId: i,
        reviewerStars: getRandomRating(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert(Review.tableName, ratings);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(Review.tableName, {}, {});
  },
};

const getRandomRating = () => {
  const min = 1;
  const max = 5;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
