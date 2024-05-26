import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../config/database";


export interface ProductAttributes {
  Name: string;
  Quantity: number;
  Restock_Level: number;
  Price: number;
  Created_by: string;
  Business_id: string;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public Name!: string;
  public Quantity!: number;
  public Restock_Level!: number;
  public Price!: number;
  public Created_by!: string;
  public Business_id!: string;
 

  static associate(models: any) {
    this.belongsTo(models.Business)
  }
}

Product.init(
  {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    Restock_Level: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    Price: {
      type: DataTypes.NUMBER,
    },
    Created_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Business_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('uuid_generate_v4()::uuid'),
    },
  },
  {
    sequelize: db,
    tableName: "product",
    modelName: "Product", // This is optional, Sequelize will use 'User' by default
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default Product;
