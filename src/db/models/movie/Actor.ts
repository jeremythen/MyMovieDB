import sequelize from '../../connection';
import MovieCast from './MovieCast';

import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
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

  public getMovies!: HasManyGetAssociationsMixin<MovieCast>;
  public addMovie!: HasManyAddAssociationMixin<MovieCast, number>;
  public hasMovie!: HasManyHasAssociationMixin<MovieCast, number>;
  public countMovies!: HasManyCountAssociationsMixin;
  public createMovie!: HasManyCreateAssociationMixin<MovieCast>;

  public readonly movies?: MovieCast[];

  public static associations: {
    movies: Association<Actor, MovieCast>,
  }

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

Actor.hasMany(MovieCast, {
  sourceKey: 'id',
  foreignKey: 'actorId',
  as: 'movies',
});

export default Actor;