import { DataTypes, Model, Sequelize } from "sequelize";
import db from "../config/database";
import User from "./User";

interface BusinessAttributes {
  id: string;
  businessName: string;
  businessAddress: string;
  businessDescription: string;
}

class Business extends Model<BusinessAttributes> implements BusinessAttributes {

  public id!: string;
  public businessName!: string;
  public businessAddress!: string;
  public businessDescription!: string;

  static associate(models: any) {
    this.hasMany(models.User)
  }
  
}

Business.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()::uuid'),
      },
      businessName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      businessAddress: {
        type: DataTypes.STRING,
      },
      businessDescription: {
        type: DataTypes.STRING,
      },
    },
    {
    sequelize: db,
    tableName: "business",
    timestamps: true,
  }
)

export default Business