'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import Director from '../models/movie/Director';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(Director.tableName, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(Director.tableName);
  }
};
