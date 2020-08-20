'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import MovieCast from '../models/movie/MovieCast';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(MovieCast.tableName, {
        actorId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        movieId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      role: DataTypes.STRING(50),
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    });

    queryInterface.addIndex(MovieCast.tableName, ['movieId', 'actorId'], {
      name: 'movieId_actorId_Index',
      unique: true
    });

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(MovieCast.tableName);
  }
};
