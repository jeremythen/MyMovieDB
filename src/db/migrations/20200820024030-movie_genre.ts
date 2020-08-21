'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import MovieGenre from '../models/movie/MovieGenre';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(MovieGenre.tableName, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      movieId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      genreId: {
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

    queryInterface.addIndex(MovieGenre.tableName, ['movieId', 'genreId'], {
      name: 'movieId_genreId_Index',
      unique: true
    });

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(MovieGenre.tableName);
  }
};
