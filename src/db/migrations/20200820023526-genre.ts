'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import Genre from '../models/movie/Genre';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(Genre.tableName, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.ENUM(
          "ACTION",
          "ADVENTURE",
          "COMEDY",
          "CRIME",
          "DRAMA",
          "FANTASY",
          "HISTORICAL",
          "HORROR",
          "ROMANCE",
          "SAGA",
          "SOCIAL",
          "THRILLER",
          "URBAN",
          "MYSTERY",
          "POLITICAL",
          "MAGICAL_REALISM",
          "PHILOSOPHICAL",
          "SPECULATIVE",
          "WESTERN",
          "PARANOID_FICTION",
          "HISTORICAL_FICTION",
          "ABSURDIST",
          "SURREAL",
          "WHIMSICAL"
        ),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    });

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(Genre.tableName);
  }
};
