"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../connection"));
const sequelize_1 = require("sequelize");
class Actor extends sequelize_1.Model {
}
Actor.init({
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
    tableName: "actors",
    sequelize: connection_1.default,
    timestamps: true,
});
exports.default = Actor;
