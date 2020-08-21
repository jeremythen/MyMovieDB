'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import Review from '../models/movie/Review';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(Review.tableName, {
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
      reviewerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      reviewerStars: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
      },
      comment: DataTypes.STRING(255),
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    queryInterface.addIndex(Review.tableName, ['movieId', 'reviewerId'], {
      name: 'movieId_reviewerId_Index',
      unique: true
    });

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(Review.tableName);
  }
};
