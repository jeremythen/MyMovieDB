"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreationPayload = void 0;
const connection_1 = __importDefault(require("../connection"));
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        get() {
            return () => this.getDataValue('password');
        }
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("USER", "ADMIN"),
        allowNull: false,
        defaultValue: "USER",
    },
}, {
    tableName: "users",
    sequelize: connection_1.default,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["username"],
        },
        {
            unique: true,
            fields: ["email"],
        },
    ],
});
exports.default = User;
class UserCreationPayload {
    constructor() {
        this.firstName = '';
        this.lastName = '';
    }
}
exports.UserCreationPayload = UserCreationPayload;
