import { AverageTable } from "./average.js";
import { LogTable } from "./log.js";
import { MachineTable } from "./machine.js";
import { MainTable } from "./main.js";
import { RuntimeTable } from "./runtime.js";

MachineTable.hasMany(MainTable, {
  foreignKey: "machine_id",
  as: "main_readings",
});

MainTable.belongsTo(MachineTable, {
  foreignKey: "machine_id",
  as: "machine",
});

MachineTable.hasMany(AverageTable, {
  foreignKey: "machine_id",
  as: "average_readings",
});

AverageTable.belongsTo(MachineTable, {
  foreignKey: "machine_id",
  as: "machine",
});

MachineTable.hasMany(LogTable, {
  foreignKey: "machine_id",
  as: "logs",
});

LogTable.belongsTo(MachineTable, {
  foreignKey: "machine_id",
  as: "machine",
});

MachineTable.hasMany(RuntimeTable, {
  foreignKey: "machine_id",
  as: "runtimes",
});

RuntimeTable.belongsTo(MachineTable, {
  foreignKey: "machine_id",
  as: "machine",
});
