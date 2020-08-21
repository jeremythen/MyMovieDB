"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../connection"));
const sequelize_1 = require("sequelize");
class MovieGenre extends sequelize_1.Model {
}
MovieGenre.init({
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
    genreId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    tableName: "movie_genres",
    sequelize: connection_1.default,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["movieId", "genreId"],
        },
    ],
});
exports.default = MovieGenre;
