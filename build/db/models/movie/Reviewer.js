"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../connection"));
const Review_1 = __importDefault(require("./Review"));
const sequelize_1 = require("sequelize");
class Reviewer extends sequelize_1.Model {
}
Reviewer.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    tableName: "reviewers",
    sequelize: connection_1.default,
    timestamps: true,
});
Reviewer.hasMany(Review_1.default, {
    sourceKey: 'id',
    foreignKey: 'reviewerId',
    as: 'reviews',
});
exports.default = Reviewer;
