import sequelize from '../../connection';

import {
  Model,
  DataTypes,
  Optional
} from "sequelize";

export interface ReviewAttributes {
  id: number;
  movieId: number;
  reviewerId: number;
  reviewerStars: number;
  comment: string;
}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id' | 'comment'> { }

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> {
  public id: number;
  public movieId!: number;
  public reviewerId!: number;
  public reviewerStars!: number;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    reviewerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    reviewerStars: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  },
  {
    tableName: "reviews",
    sequelize,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["movieId", "reviewerId"], // Allowing a reviewer to submit only 1 review per movie.
      },
    ],
  }
);

export default Review;