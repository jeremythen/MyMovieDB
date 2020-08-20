"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../connection"));
const sequelize_1 = require("sequelize");
class MovieDirection extends sequelize_1.Model {
}
MovieDirection.init({
    directorId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    movieId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    tableName: "movie_direction",
    sequelize: connection_1.default,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["directorId", "movieId"],
        },
    ],
});
exports.default = MovieDirection;
