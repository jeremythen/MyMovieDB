'use strict';

import { QueryInterface } from 'sequelize';
import faker from 'faker';
import bcrypt from 'bcrypt';
import envConfig from '../../config/envConfig';
const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {

    const users = [];
    
    for (let i = 0; i < seeds; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 10),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    
    await queryInterface.bulkInsert('users', users);

  },

  down: async (queryInterface: QueryInterface) => {

    await queryInterface.bulkDelete('users', {}, {});

  }
};
