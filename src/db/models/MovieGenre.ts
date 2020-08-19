import sequelize from '../connection';

import {
  Model,
  DataTypes,
} from "sequelize";

export interface MovieGenreAttributes {
  movieId: number;
  genreId: number;
}
class MovieGenre extends Model<MovieGenreAttributes> {
  public genreId!: number;
  public movieId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MovieGenre.init(
  {
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
    tableName: "movie_genre",
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