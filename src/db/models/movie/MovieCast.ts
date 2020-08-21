import sequelize from '../../connection';

import {
  Model,
  DataTypes,
  Optional,
} from "sequelize";

export interface MovieCastAttributes {
  id: number;
  actorId: number;
  movieId: number;
  role: string;
}

export interface MovieCastCreationAttributes extends Optional<MovieCastAttributes, 'id'> { }
class MovieCast extends Model<MovieCastAttributes, MovieCastCreationAttributes> {
  public id: number;
  public actorId!: number;
  public movieId!: number;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MovieCast.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
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