'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import Reviewer from '../models/movie/Reviewer';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(Reviewer.tableName, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(Reviewer.tableName);
  }
};
