import sequelize from "../connection";

import { Model, DataTypes, Optional } from "sequelize";

export interface GenreAttributes {
  id: number;
  title: string;
}

export interface GenreCreationAttributes
  extends Optional<GenreAttributes, 'id'> {}

class Genre extends Model<GenreAttributes, GenreCreationAttributes> {
  public id!: number;
  public title!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.ENUM(
        "ACTION",
        "ADVENTURE",
        "COMEDY",
        "CRIME",
        "DRAMA",
        "FANTASY",
        "HISTORICAL",
        "HORROR",
        "ROMANCE",
        "SAGA",
        "SOCIAL",
        "THRILLER",
        "URBAN",
        "MYSTERY",
        "POLITICAL",
        "MAGICAL_REALISM",
        "PHILOSOPHICAL",
        "SPECULATIVE",
        "WESTERN",
        "PARANOID_FICTION",
        "HISTORICAL_FICTION",
        "ABSURDIST",
        "SURREAL",
        "WHIMSICAL"
      ),
      allowNull: false,
    },
  },
  {
    tableName: "genres",
    sequelize,
    timestamps: true,
  }
);

export default Genre;