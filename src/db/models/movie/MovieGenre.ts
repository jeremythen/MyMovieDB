import sequelize from '../../connection';
import { Optional } from 'sequelize';

import {
  Model,
  DataTypes,
} from "sequelize";

export interface MovieGenreAttributes {
  id: number;
  movieId: number;
  genreId: number;
}

export interface MovieGenreCreationAttributes extends Optional<MovieGenreAttributes, 'id'> {}

class MovieGenre extends Model<MovieGenreAttributes, MovieGenreCreationAttributes> {
  public id: number;
  public genreId!: number;
  public movieId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MovieGenre.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    genreId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "movie_genres",
    sequelize,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["movieId", "genreId"],
      },
    ],
  }
);

export default MovieGenre;