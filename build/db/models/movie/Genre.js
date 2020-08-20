"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../connection"));
const sequelize_1 = require("sequelize");
class Genre extends sequelize_1.Model {
}
Genre.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.ENUM("ACTION", "ADVENTURE", "COMEDY", "CRIME", "DRAMA", "FANTASY", "HISTORICAL", "HORROR", "ROMANCE", "SAGA", "SOCIAL", "THRILLER", "URBAN", "MYSTERY", "POLITICAL", "MAGICAL_REALISM", "PHILOSOPHICAL", "SPECULATIVE", "WESTERN", "PARANOID_FICTION", "HISTORICAL_FICTION", "ABSURDIST", "SURREAL", "WHIMSICAL"),
        allowNull: false,
    },
}, {
    tableName: "genres",
    sequelize: connection_1.default,
    timestamps: true,
});
exports.default = Genre;
