"use strict";

import { QueryInterface } from "sequelize";
import faker from "faker";
import envConfig from '../../config/envConfig';
const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const movies = [];

    for (let i = 0; i < seeds; i++) {
      movies.push({
        title: faker.lorem.words(),
        year: getYear(),
        time: getRandomTime(),
        language: 'English',
        country: faker.address.country(),
        distributor: 'Universal Pictures',
        disabled: false,
      });
    }

    await queryInterface.bulkInsert("movies", movies);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("movies", {}, {});
  },
};

const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

const getYear = () => {
  return years[Math.floor(Math.random() * years.length)];
}

const getRandomTime = () => {
  const min = 60;
  const max = 160;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
