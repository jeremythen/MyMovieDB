"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../connection"));
const MovieDirection_1 = __importDefault(require("./MovieDirection"));
const sequelize_1 = require("sequelize");
class Director extends sequelize_1.Model {
}
Director.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    tableName: "directors",
    sequelize: connection_1.default,
    timestamps: true,
});
Director.hasMany(MovieDirection_1.default, {
    sourceKey: 'id',
    foreignKey: 'directorId',
    as: 'movies',
});
exports.default = Director;
