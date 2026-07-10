import { AverageTable } from "../models/average";

async function insert(data) {
  try {
    const result = await AverageTable.create(data);
    return {
      status: 200,
      message: "Average data inserted successfully",
      data: result,
    };
  }
  catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to insert average data",
      error: error.message,
    };
  }
}

export default {
  insert,
};
