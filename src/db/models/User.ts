import sequelize from '../connection';
import Review from './movie/Review';

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


export interface UserAttributes {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'firstName' | 'lastName' | 'role'> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public username!: string;
  public firstName: string;
  public lastName: string;
  public email!: string;
  public password!: string;
  public role: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getReviews!: HasManyGetAssociationsMixin<Review>;
  public addReview!: HasManyAddAssociationMixin<Review, number>;
  public hasReview!: HasManyHasAssociationMixin<Review, number>;
  public countReview!: HasManyCountAssociationsMixin;
  public createReview!: HasManyCreateAssociationMixin<Review>;

  public readonly reviews?: Review[];

  public static associations: {
    reviews: Association<User, Review>,
  }

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
    },
    lastName: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      get() {
        return () => this.getDataValue('password');
      }
    },
    role: {
      type: DataTypes.ENUM("USER", "ADMIN"),
      allowNull: false,
      defaultValue: "USER",
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["username"],
      },
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

User.hasMany(Review, {
  sourceKey: 'id',
  foreignKey: 'reviewerId',
  as: 'reviews',
});

export default User;