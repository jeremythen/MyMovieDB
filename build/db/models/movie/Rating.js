"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../connection"));
const sequelize_1 = require("sequelize");
class Rating extends sequelize_1.Model {
}
Rating.init({
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
}, {
    tableName: "ratings",
    sequelize: connection_1.default,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["movieId", "reviewerId"],
        },
    ],
});
exports.default = Rating;