'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import Rating from '../models/movie/Rating';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(Rating.tableName, {
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
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
    });

    queryInterface.addIndex(Rating.tableName, ['movieId', 'reviewerId'], {
      name: 'movieId_reviewerId_Index',
      unique: true
    });

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(Rating.tableName);
  }
};
