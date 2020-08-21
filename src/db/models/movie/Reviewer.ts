import sequelize from '../../connection';
import Review from './Review';

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

export interface ReviewerAttributes {
  id: number;
  name: string;
}

export interface ReviewerCreationAttributes extends Optional<ReviewerAttributes, 'id'> {}
  
class Reviewer extends Model<ReviewerCreationAttributes> {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getReviews!: HasManyGetAssociationsMixin<Review>;
  public addReview!: HasManyAddAssociationMixin<Review, number>;
  public hasReview!: HasManyHasAssociationMixin<Review, number>;
  public countReview!: HasManyCountAssociationsMixin;
  public createReview!: HasManyCreateAssociationMixin<Review>;

  public readonly reviews?: Review[];

  public static associations: {
    reviews: Association<Reviewer, Review>,
  }

}

Reviewer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "reviewers",
    sequelize,
    timestamps: true,
  }
);

Reviewer.hasMany(Review, {
  sourceKey: 'id',
  foreignKey: 'reviewerId',
  as: 'reviews',
});

export default Reviewer;