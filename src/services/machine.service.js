import { MachineTable } from "../models/machine";

async function get(param) {
  try {
    const query = {};
    if (param.unit) {
      query.unit = param.unit;
    }
    if (param.company) {
      query.company = param.company;
    }

    const result = await MachineTable.findAll({ where: query });

    return {
      status: 200,
      message: "Machine data retrieved successfully",
      data: result,
    };
  }
  catch (error) {
    return {
      status: 500,
      message: "Failed to retrieve Log data",
      error: error.message,
    };
  }
}

export default {
  get,
}