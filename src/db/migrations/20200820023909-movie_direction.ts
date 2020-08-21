'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import MovieDirection from '../models/movie/MovieDirection';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(MovieDirection.tableName, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      directorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      movieId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    });

    queryInterface.addIndex(MovieDirection.tableName, ['directorId', 'movieId'], {
      name: 'directorId_movieId_Index',
      unique: true
    });

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(MovieDirection.tableName);
  }
};
