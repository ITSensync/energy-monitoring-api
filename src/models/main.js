import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { MachineTable } from "./machine.js";

export const MainTable = sequelize.define("main", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  machine_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
      model: MachineTable,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  volt: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  current1: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  current2: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  current3: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  watt1: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  watt2: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  watt3: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  tableName: "main",
  timestamps: false,
  freezeTableName: true,
});
