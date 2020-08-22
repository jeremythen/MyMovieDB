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
const Review_1 = __importDefault(require("../models/movie/Review"));
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable(Review_1.default.tableName, {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            movieId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            reviewerId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            reviewerStars: {
                type: sequelize_1.DataTypes.TINYINT.UNSIGNED,
                allowNull: false,
            },
            comment: sequelize_1.DataTypes.STRING(255),
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        });
        queryInterface.addIndex(Review_1.default.tableName, ['movieId', 'reviewerId'], {
            name: 'movieId_reviewerId_Index',
            unique: true
        });
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.dropTable(Review_1.default.tableName);
    })
};