import sequelize from '../../connection';

import {
  Model,
  DataTypes,
  Optional
} from "sequelize";

export interface MovieDirectionAttributes {
  id: number;
  directorId: number;
  movieId: number;
}

export interface MovieDirectionCreationAttributes extends Optional<MovieDirectionAttributes, 'id'> {}

class MovieDirection extends Model<MovieDirectionAttributes, MovieDirectionCreationAttributes> {
  public id: number;
  public directorId!: number;
  public movieId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MovieDirection.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
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
    tableName: "movie_directors",
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