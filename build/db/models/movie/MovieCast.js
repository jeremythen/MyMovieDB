"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../connection"));
const sequelize_1 = require("sequelize");
class MovieCast extends sequelize_1.Model {
}
MovieCast.init({
    actorId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    movieId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    role: sequelize_1.DataTypes.STRING(50),
}, {
    tableName: "movie_casts",
    sequelize: connection_1.default,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["actorId", "movieId"],
        },
    ],
});
exports.default = MovieCast;
