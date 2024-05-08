import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../config/database";
import Business from "./Business";
import { IRole } from "../interfaces/role.model";

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: IRole;
  verificationToken: string;
  verified: boolean;
  businessId: string
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber!: string;
  public role!: IRole;
  public verificationToken!: string;
  public verified!: boolean;
  public businessId!: string;

  static associate(models: any) {
    this.belongsTo(models.Business)
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('uuid_generate_v4()::uuid'),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    businessId: {
      type: DataTypes.UUID, // Data type of the foreign key
      allowNull: false, // Foreign key cannot be null
    },
  },
  {
    sequelize: db,
    tableName: "user",
    modelName: "User", // This is optional, Sequelize will use 'User' by default
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default User;
