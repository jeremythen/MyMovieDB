'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import Actor from '../models/movie/Actor';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(Actor.tableName, {
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
    await queryInterface.dropTable(Actor.tableName);
  }
};
