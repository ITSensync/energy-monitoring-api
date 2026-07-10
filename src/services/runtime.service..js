import { RuntimeTable } from "../models/runtime";

async function insert(data) {
  try {
    const result = await RuntimeTable.create(data);
    return {
      status: 200,
      message: "Runtime data inserted successfully",
      data: result,
    };
  }
  catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to insert runtime data",
      data: error,
    };
  }
}

export default {
  insert,
};
