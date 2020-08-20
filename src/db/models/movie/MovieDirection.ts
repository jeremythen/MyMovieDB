import sequelize from '../../connection';

import {
  Model,
  DataTypes,
} from "sequelize";

export interface MovieDirectionAttributes {
  directorId: number;
  movieId: number;
}
class MovieDirection extends Model<MovieDirectionAttributes> {
  public directorId!: number;
  public movieId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MovieDirection.init(
  {
    directorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "movie_direction",
    sequelize,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["directorId", "movieId"],
      },
    ],
  }
);

export default MovieDirection;