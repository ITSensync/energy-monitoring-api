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

const wibOffsetMs = 7 * 60 * 60 * 1000;

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

  return new Date((number * 1000) + wibOffsetMs);
}

function getWibTimestamp() {
  return new Date(Date.now() + wibOffsetMs);
}

function prepareRows(data) {
  return data.map(row => ({
    timestamp: toDate(row.timestamp),
    volt: toNumber(row.volt),
    current1: toNumber(row.current1),
    current2: toNumber(row.current2),
    current3: toNumber(row.current3),
    watt1: toNumber(row.watt1),
    watt2: toNumber(row.watt2),
    watt3: toNumber(row.watt3),
  }));
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
    timestamp: getWibTimestamp(),
  });
}

async function processCsv(csvString, message) {
  console.log(JSON.stringify({ csvString }));
  const dataString = Papa.parse(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  const preparedData = prepareRows(dataString.data);

  await MainTable.bulkCreate(preparedData);

  const averageData = calculateAverage(preparedData);
  const average = await AverageTable.create(averageData);

  return {
    status: 200,
    message,
    data: preparedData,
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
