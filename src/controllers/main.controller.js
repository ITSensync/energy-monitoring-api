import mainService from "../services/main.service.js";

async function insert(req, res) {
  const { file } = req;

  if (!file) {
    return res.status(400).json({
      message: "No file uploaded.",
    });
  }

  const result = await mainService.insert(file);

  res.status(result.status).send(result);
}

async function insertText(req, res) {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      message: "No text data provided.",
    });
  }

  const result = await mainService.insertText(body);

  res.status(result.status).send(result);
}

export default {
  insert,
  insertText,
};
