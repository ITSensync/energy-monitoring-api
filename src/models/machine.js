import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const MachineTable = sequelize.define("machine", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  unit: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: "machine",
  timestamps: false,
  freezeTableName: true,
});
