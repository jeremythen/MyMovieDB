//import Sequelize from 'sequelize';
import sequelize from '../../connection';
import Reviewer from './Reviewer';
import Genre from "./Genre";
import Director from './Director';
import Actor from "./Actor";

import {
  Sequelize,
  Model,
  ModelDefined,
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

export interface MovieCreationAttributes extends Optional<MovieAttributes, 'id' | 'year' | 'language' | 'time' | 'country' | 'distributor' | 'disabled'> {}

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

Movie.belongsToMany(Reviewer, { through: 'Rating' });
Reviewer.belongsToMany(Movie, { through: 'Rating' });

Movie.belongsToMany(Genre, { through: 'MovieGenre' });
Genre.belongsToMany(Movie, { through: 'MovieGenre' });

Movie.belongsToMany(Director, { through: 'MovieDirection' });
Director.belongsToMany(Movie, { through: 'MovieDirection' });

Movie.belongsToMany(Actor, { through: 'MovieCast' });
Actor.belongsToMany(Movie, { through: 'MovieCast' });

export default Movie;