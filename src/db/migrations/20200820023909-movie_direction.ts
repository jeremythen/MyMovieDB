'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import MovieDirection from '../models/movie/MovieDirection';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(MovieDirection.tableName, {
      directorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      movieId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
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
