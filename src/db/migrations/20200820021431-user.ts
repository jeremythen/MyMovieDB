'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import User from '../models/User';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(User.tableName, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
      },
      lastName: {
        type: DataTypes.STRING(50),
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        get() {
          return () => this.getDataValue('password');
        }
      },
      role: {
        type: DataTypes.ENUM("USER", "ADMIN"),
        allowNull: false,
        defaultValue: "USER",
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
    });

    queryInterface.addIndex(User.tableName, ['username'], {
      name: 'usernameIndex',
      unique: true
    });

    queryInterface.addIndex(User.tableName, ['email'], {
      name: 'emailIndex',
      unique: true
    });

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(User.tableName);
  }
};
