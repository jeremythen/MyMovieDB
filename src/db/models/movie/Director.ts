import sequelize from "../../connection";

import {
  Model,
  DataTypes,
  Optional,
} from "sequelize";

export interface DirectorAttributes {
  id: number;
  firstName: string;
  lastName: string;
}

export interface DirectorCreationAttributes
  extends Optional<DirectorAttributes, 'id'> {}

class Director extends Model<DirectorAttributes, DirectorCreationAttributes> {
  public id!: number;
  public firstName!: string;
  public lastName!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Director.init(
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
    tableName: "directors",
    sequelize,
    timestamps: true,
  }
);

export default Director;