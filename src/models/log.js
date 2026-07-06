import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const LogTable = sequelize.define("log", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "log",
  timestamps: false,
  freezeTableName: true,
});
