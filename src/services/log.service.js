import { LogTable } from "../models/log";

async function insert(data) {
  try {
    if (!data) {
      throw new Error("No data log provided");
    }
    const result = await LogTable.create(data);
    return {
      status: 200,
      message: "Log data inserted successfully",
      data: result,
    };
  }
  catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Failed to insert Log data",
      error: error.message,
    };
  }
}

async function get(param) {
  try {
    const query = {};
    if (param.machine_id) {
      query.machine_id = param.machine_id;
    }
    if (param.start_date && param.end_date) {
      query.createdAt = {
        $between: [new Date(param.start_date), new Date(param.end_date)],
      };
    }

    const result = await LogTable.findAll({ where: query });
    return {
      status: 200,
      message: "Log data retrieved successfully",
      data: result,
    };
  }
  catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Failed to retrieve Log data",
      error: error.message,
    };
  }
}

export default {
  insert,
  get,
};
