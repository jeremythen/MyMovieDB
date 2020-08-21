'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import MovieCast from '../models/movie/MovieCast';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(MovieCast.tableName, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
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
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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
