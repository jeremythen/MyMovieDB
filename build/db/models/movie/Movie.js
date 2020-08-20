"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import Sequelize from 'sequelize';
const connection_1 = __importDefault(require("../../connection"));
const Reviewer_1 = __importDefault(require("./Reviewer"));
const Genre_1 = __importDefault(require("./Genre"));
const Director_1 = __importDefault(require("./Director"));
const Actor_1 = __importDefault(require("./Actor"));
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
Movie.belongsToMany(Reviewer_1.default, { through: 'Rating' });
Reviewer_1.default.belongsToMany(Movie, { through: 'Rating' });
Movie.belongsToMany(Genre_1.default, { through: 'MovieGenre' });
Genre_1.default.belongsToMany(Movie, { through: 'MovieGenre' });
Movie.belongsToMany(Director_1.default, { through: 'MovieDirection' });
Director_1.default.belongsToMany(Movie, { through: 'MovieDirection' });
Movie.belongsToMany(Actor_1.default, { through: 'MovieCast' });
Actor_1.default.belongsToMany(Movie, { through: 'MovieCast' });
exports.default = Movie;
