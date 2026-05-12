import Papa from "papaparse";
import { AverageTable } from "../models/average.js";
import { MainTable } from "../models/main.js";

const averageFields = [
  "volt",
  "current1",
  "current2",
  "current3",
  "watt1",
  "watt2",
  "watt3",
];

const csvColumnMap = {
  timestamp: "timestamp",
  volt: "volt",
  current_a: "current1",
  current_b: "current2",
  current_c: "current3",
  watt_a: "watt1",
  watt_b: "watt2",
  watt_c: "watt3",
};

function toNumber(value) {
  if (value === null || value === undefined || value === "")
    return null;

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function toDate(value) {
  const number = toNumber(value);

  if (number === null)
    return null;

  return new Date(number * 1000);
}

function normalizeRows(data) {
  return data.map((row) => {
    const normalizedRow = {};

    for (const [csvColumn, tableColumn] of Object.entries(csvColumnMap)) {
      if (tableColumn === "timestamp") {
        normalizedRow[tableColumn] = toDate(row[csvColumn]);
        continue;
      }

      normalizedRow[tableColumn] = toNumber(row[csvColumn]);
    }

    return normalizedRow;
  });
}

function calculateAverage(data) {
  return averageFields.reduce((result, field) => {
    const values = data
      .map(row => toNumber(row[field]))
      .filter(value => value !== null);

    result[field] = values.length
      ? values.reduce((total, value) => total + value, 0) / values.length
      : null;

    return result;
  }, {
    machine_id: null,
  });
}

async function processCsv(csvString, message) {
  const dataString = Papa.parse(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  const normalizedData = normalizeRows(dataString.data);

  await MainTable.bulkCreate(normalizedData);

  const averageData = calculateAverage(normalizedData);
  const average = await AverageTable.create(averageData);

  return {
    status: 200,
    message,
    data: normalizedData,
    average: average.toJSON(),
  };
}

async function insert(file) {
  try {
    const csvString = file.buffer.toString("utf-8");

    return await processCsv(csvString, "File processed successfully.");
  }
  catch (error) {
    return {
      status: 500,
      message: "Failed to process the file.",
      error: error.message,
    };
  }
}

async function insertText(text) {
  try {
    return await processCsv(text, "Text data processed successfully.");
  }
  catch (error) {
    return {
      status: 500,
      message: "Failed to process the text data.",
      error: error.message,
    };
  }
}

export default {
  insert,
  insertText,
};
