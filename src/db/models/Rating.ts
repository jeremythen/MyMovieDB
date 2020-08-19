import sequelize from '../connection';

import {
  Model,
  DataTypes,
} from "sequelize";

export interface RatingAttributes {
  movieId: number;
  reviewerId: number;
  reviewerStars: number;
}
class Rating extends Model<RatingAttributes> {
  public movieId!: number;
  public reviewerId!: number;
  public reviewerStars!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Rating.init(
  {
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
  },
  {
    tableName: "ratings",
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

export default Rating;