'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("../models/User"));
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable(User_1.default.tableName, {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            firstName: {
                type: sequelize_1.DataTypes.STRING(50),
            },
            lastName: {
                type: sequelize_1.DataTypes.STRING(50),
            },
            email: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            password: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                get() {
                    return () => this.getDataValue('password');
                }
            },
            role: {
                type: sequelize_1.DataTypes.ENUM("USER", "ADMIN"),
                allowNull: false,
                defaultValue: "USER",
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE
            },
        });
        queryInterface.addIndex(User_1.default.tableName, ['username'], {
            name: 'usernameIndex',
            unique: true
        });
        queryInterface.addIndex(User_1.default.tableName, ['email'], {
            name: 'emailIndex',
            unique: true
        });
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.dropTable(User_1.default.tableName);
    })
};
