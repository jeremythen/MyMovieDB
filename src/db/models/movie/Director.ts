import sequelize from "../../connection";

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

import MovieDirection from './MovieDirection';

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

  public getMovies!: HasManyGetAssociationsMixin<MovieDirection>;
  public addMovie!: HasManyAddAssociationMixin<MovieDirection, number>;
  public hasMovie!: HasManyHasAssociationMixin<MovieDirection, number>;
  public countMovies!: HasManyCountAssociationsMixin;
  public createMovie!: HasManyCreateAssociationMixin<MovieDirection>;

  public readonly movies?: MovieDirection[];

  public static associations: {
    movies: Association<Director, MovieDirection>,
  }
  
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

Director.hasMany(MovieDirection, {
  sourceKey: 'id',
  foreignKey: 'directorId',
  as: 'movies',
});

export default Director;