import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { MachineTable } from "./machine.js";

export const AverageTable = sequelize.define("average", {
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
  data_count: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: "average",
  timestamps: false,
  freezeTableName: true,
});
