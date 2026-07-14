import cors from "cors";

/* Aquí debe ir la lógica de tu middleware */
const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:1234",
  "https://midu.dev",
  "http://jscamp.dev",
  "http://localhost:5173",
];

export function middlewareCors({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) {
  const corsOptions = {
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true);
      }

      return callback(new Error("Origen no permitido"));
    },
  };

  return cors(corsOptions);
}
