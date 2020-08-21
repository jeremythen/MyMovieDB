"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import Sequelize from 'sequelize';
const connection_1 = __importDefault(require("../../connection"));
const sequelize_1 = require("sequelize");
const Actor_1 = __importDefault(require("./Actor"));
const MovieCast_1 = __importDefault(require("./MovieCast"));
const Review_1 = __importDefault(require("./Review"));
const MovieDirection_1 = __importDefault(require("./MovieDirection"));
const MovieGenre_1 = __importDefault(require("./MovieGenre"));
class Movie extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.disabled = false;
    }
}
exports.default = Movie;
Movie.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    time: sequelize_1.DataTypes.INTEGER,
    language: sequelize_1.DataTypes.STRING(50),
    country: sequelize_1.DataTypes.STRING(50),
    distributor: sequelize_1.DataTypes.STRING(50),
    disabled: sequelize_1.DataTypes.BOOLEAN,
}, {
    tableName: "movies",
    sequelize: connection_1.default,
    timestamps: true,
});
Movie.belongsToMany(Actor_1.default, {
    sourceKey: 'id',
    foreignKey: 'movieId',
    through: MovieCast_1.default.tableName,
    as: 'casts',
});
Actor_1.default.belongsToMany(Movie, {
    sourceKey: 'id',
    foreignKey: 'actorId',
    through: MovieCast_1.default.tableName,
    as: 'movies',
});
// Movie.hasMany(MovieCast, {
//   sourceKey: 'id',
//   foreignKey: 'movieId',
//   as: 'casts',
// });
Movie.hasMany(MovieDirection_1.default, {
    sourceKey: 'id',
    foreignKey: 'movieId',
    as: 'directors',
});
Movie.hasMany(MovieGenre_1.default, {
    sourceKey: 'id',
    foreignKey: 'movieId',
    as: 'genres',
});
Movie.hasMany(Review_1.default, {
    sourceKey: 'id',
    foreignKey: 'movieId',
    as: 'reviews',
});
