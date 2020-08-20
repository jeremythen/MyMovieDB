'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import Movie from '../models/movie/Movie';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(Movie.tableName, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time: DataTypes.INTEGER,
      language: DataTypes.STRING(50),
      country: DataTypes.STRING(50),
      distributor: DataTypes.STRING(50),
      disabled: DataTypes.BOOLEAN,
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
    });
    
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(Movie.tableName);
  }
};
