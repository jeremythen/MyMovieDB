import sequelize from '../connection';

import {
  Model,
  DataTypes,
} from "sequelize";

export interface MovieCastAttributes {
  actorId: number;
  movieId: number;
  role: string;
}

class MovieCast extends Model<MovieCastAttributes> {
  public actorId!: number;
  public movieId!: number;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MovieCast.init(
  {
    actorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    role: DataTypes.STRING(50),
  },
  {
    tableName: "movie_casts",
    sequelize,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["actorId", "movieId"],
      },
    ],
  }
);

export default MovieCast;