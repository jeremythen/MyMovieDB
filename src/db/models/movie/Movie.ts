//import Sequelize from 'sequelize';
import sequelize from '../../connection';
import MovieCast from './MovieCast';
import Review from './Review';
import MovieDirection from './MovieDirection';
import MovieGenre from './MovieGenre';

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

export interface MovieAttributes {
  id: number;
  title: string;
  year: number;
  time: number;
  language: string;
  country: string;
  distributor: string;
  disabled: boolean;
}

export interface MovieCreationAttributes extends Optional<MovieAttributes, 'id' | 'language' | 'time' | 'country' | 'distributor' | 'disabled'> {}

class Movie extends Model<MovieAttributes, MovieCreationAttributes> {
  public id!: number;
  public title!: string;
  public year!: number;
  public time: number | null;
  public language: string | null;
  public country: string | null;
  public distributor: string | null;
  public disabled: boolean = false;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getCasts!: HasManyGetAssociationsMixin<MovieCast>;
  public addCast!: HasManyAddAssociationMixin<MovieCast, number>;
  public hasCast!: HasManyHasAssociationMixin<MovieCast, number>;
  public countCasts!: HasManyCountAssociationsMixin;
  public createCast!: HasManyCreateAssociationMixin<MovieCast>;

  public getDirectors!: HasManyGetAssociationsMixin<MovieDirection>;
  public addDirector!: HasManyAddAssociationMixin<MovieDirection, number>;
  public hasDirector!: HasManyHasAssociationMixin<MovieDirection, number>;
  public countDirectors!: HasManyCountAssociationsMixin;
  public createDirector!: HasManyCreateAssociationMixin<MovieDirection>;

  public getGenres!: HasManyGetAssociationsMixin<MovieGenre>;
  public addGenre!: HasManyAddAssociationMixin<MovieGenre, number>;
  public hasGenre!: HasManyHasAssociationMixin<MovieGenre, number>;
  public countGenres!: HasManyCountAssociationsMixin;
  public createGenre!: HasManyCreateAssociationMixin<MovieGenre>;

  public getReviews!: HasManyGetAssociationsMixin<Review>;
  public addReviews!: HasManyAddAssociationMixin<Review, number>;
  public hasReviews!: HasManyHasAssociationMixin<Review, number>;
  public countReviews!: HasManyCountAssociationsMixin;
  public createReviews!: HasManyCreateAssociationMixin<Review>;

  public readonly casts?: MovieCast[];
  public readonly directors?: MovieDirection[];
  public readonly genres?: MovieGenre[];
  public readonly ratings?: Review[];

  public static associations: {
    casts: Association<Movie, MovieCast>,
    directors: Association<Movie, MovieDirection>,
    genres: Association<Movie, MovieGenre>,
    reviews: Association<Movie, Review>,
  }

}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: DataTypes.INTEGER,
    language: DataTypes.STRING(50),
    country: DataTypes.STRING(50),
    distributor: DataTypes.STRING(50),
    disabled: DataTypes.BOOLEAN,
  },
  {
    tableName: "movies",
    sequelize,
    timestamps: true,
  }
);

Movie.hasMany(MovieCast, {
  sourceKey: 'id',
  foreignKey: 'movieId',
  as: 'casts',
});

Movie.hasMany(MovieDirection, {
  sourceKey: 'id',
  foreignKey: 'movieId',
  as: 'directors',
});

Movie.hasMany(MovieGenre, {
  sourceKey: 'id',
  foreignKey: 'movieId',
  as: 'genres',
});

Movie.hasMany(Review, {
  sourceKey: 'id',
  foreignKey: 'movieId',
  as: 'reviews',
});

export default Movie;