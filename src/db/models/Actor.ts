import sequelize from '../connection';

import {
  Model,
  DataTypes,
  Optional,
} from "sequelize";

export interface ActorAttributes {
  id: number;
  firstName: string;
  lastName: string;
}

export interface ActorCreationAttributes extends Optional<ActorAttributes, 'id'> {}

class Actor extends Model<ActorAttributes, ActorCreationAttributes> {
  public id!: number;
  public firstName!: string;
  public lastName!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Actor.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "actors",
    sequelize,
    timestamps: true,
  }
);

export default Actor;