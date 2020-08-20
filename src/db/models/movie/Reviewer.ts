import sequelize from '../../connection';

import { Model, DataTypes, Optional } from "sequelize";

export interface ReviewerAttributes {
  id: number;
  name: string;
}

export interface ReviewerCreationAttributes extends Optional<ReviewerAttributes, 'id'> {}
  
class Reviewer extends Model<ReviewerCreationAttributes> {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Reviewer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "reviewers",
    sequelize,
    timestamps: true,
  }
);

export default Reviewer;