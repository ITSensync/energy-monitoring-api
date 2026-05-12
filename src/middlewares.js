import multer from "multer";
import { env } from "./env.js";

export function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(err, req, res, _next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // max 10MB (opsional)
  },
});

// khusus dokumentasi multiple
export const uploadFile = upload.single("csv");

// kalau nanti ada field lain:
// export const uploadSingle = upload.single("file");
// export const uploadFields = upload.fields([...]);
