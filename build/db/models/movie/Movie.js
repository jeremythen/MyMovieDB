"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import Sequelize from 'sequelize';
const connection_1 = __importDefault(require("../../connection"));
const MovieCast_1 = __importDefault(require("./MovieCast"));
const Rating_1 = __importDefault(require("./Rating"));
const MovieDirection_1 = __importDefault(require("./MovieDirection"));
const MovieGenre_1 = __importDefault(require("./MovieGenre"));
const sequelize_1 = require("sequelize");
class Movie extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.disabled = false;
    }
}
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
Movie.hasMany(MovieCast_1.default, {
    sourceKey: 'id',
    foreignKey: 'movieId',
    as: 'casts',
});
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
Movie.hasMany(Rating_1.default, {
    sourceKey: 'id',
    foreignKey: 'movieId',
    as: 'ratings',
});
// Movie.belongsToMany(Reviewer, { through: 'Rating' });
// Reviewer.belongsToMany(Movie, { through: 'Rating' });
// Movie.belongsToMany(Genre, { through: 'MovieGenre' });
// Genre.belongsToMany(Movie, { through: 'MovieGenre' });
// Movie.belongsToMany(Director, { through: 'MovieDirection' });
// Director.belongsToMany(Movie, { through: 'MovieDirection' });
// Movie.belongsToMany(Actor, { through: 'MovieCast' });
// Actor.belongsToMany(Movie, { through: 'MovieCast' });
exports.default = Movie;
