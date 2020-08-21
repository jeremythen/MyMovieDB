'use strict';

import { QueryInterface } from 'sequelize';
import { UserCreationAttributes } from '../models/User';
import faker from 'faker';
import bcrypt from 'bcrypt';
import envConfig from '../../config/envConfig';
const seeds = envConfig.seqSeeds;

module.exports = {
  up: async (queryInterface: QueryInterface) => {

    const users: UserCreationAttributes[] = [];
    
    for (let i = 0; i < seeds; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 10),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      });
    }
    
    await queryInterface.bulkInsert('users', users);

  },

  down: async (queryInterface: QueryInterface) => {

    await queryInterface.bulkDelete('users', {}, {});

  }
};
