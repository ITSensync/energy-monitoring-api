import Papa from "papaparse";
import { MainTable } from "../models/main.js";
import averageService from "./average.service.js";

const averageFields = [
  "volt",
  "current1",
  "current2",
  "current3",
  "energy",
  "vibration",
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
    energy: toNumber(row.energy),
    vibration: toNumber(row.vibration),
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
    data_count: data.length,
    machine_id: null,
    timestamp: getWibTimestamp(),
  });
}

async function processCsv(csvString, successMessage, errorMessage) {
  try {
    // normalize newline
    csvString = csvString.replace(/\r\n/g, "\n");

    const dataString = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });

    if (dataString.errors.length) {
      throw new Error(dataString.errors
        .map(error => error.message)
        .join(", "));
    }

    if (!dataString.data.length)
      throw new Error("CSV data is empty.");

    const preparedData = prepareRows(dataString.data);

    await MainTable.bulkCreate(preparedData);

    const averageData = calculateAverage(preparedData);
    const average = await averageService.insert(averageData);
    if (average.status !== 200) {
      throw new Error(average);
    }

    return {
      status: 200,
      message: successMessage,
      data: preparedData,
      average: average.toJSON(),
    };
  }
  catch (error) {
    return {
      status: 500,
      message: errorMessage,
      error: error.message,
    };
  }
}

async function insert(file) {
  try {
    const csvString = file.buffer.toString("utf-8");

    return await processCsv(
      csvString,
      "File processed successfully.",
      "Failed to process the file.",
    );
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
    return await processCsv(
      text,
      "Text data processed successfully.",
      "Failed to process the text data.",
    );
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
