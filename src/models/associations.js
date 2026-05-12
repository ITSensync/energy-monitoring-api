import { AverageTable } from "./average.js";
import { MachineTable } from "./machine.js";
import { MainTable } from "./main.js";

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
