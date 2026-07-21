import { test, describe, before, after } from "node:test";
import assert from "node:assert";

import { DEFAULTS } from "./config.js";
import app from "./app.js";

/*
 * Aquí debes escribir tus tests para la API de jobs
 *
 * Recuerda:
 * - Usar node:test y node:assert (sin dependencias externas)
 * - Levantar el servidor con before() y cerrarlo con after()
 * - Testear todos los endpoints: GET, POST, PUT, PATCH, DELETE
 * - Verificar validaciones con Zod
 * - Comprobar códigos de estado HTTP correctos
 */

let server;
const PORT = DEFAULTS.PORT_TEST;
const BASE_URL = `http://localhost:${PORT}/jobs`;

before(() => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve());
    server.on("error", reject);
  });
});

after(async () => {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) return reject(error);
      resolve();
    });
  });
});

describe("GET /jobs", () => {
  test("Debe responder con 200 y un array de trabajos", async () => {
    const response = await fetch(`${BASE_URL}`);
    const json = await response.json();

    assert.strictEqual(response.status, 200, "El estado debe ser 200");
    assert.ok(Array.isArray(json.data), "La respuesta debe ser un array");
  });

  test("Debe filtrar trabajos por tecnología", async () => {
    const tech = "react";
    const response = await fetch(`${BASE_URL}?technology=${tech}`);
    const json = await response.json();

    assert.ok(json.data.every((job) => job.data.technology.includes(tech)));
  });

  test("Debe respetar el limite de resultados", async () => {
    const limitValue = 2;
    const response = await fetch(`${BASE_URL}?limit=${limitValue}`);
    const json = await response.json();

    assert.strictEqual(json.limit, limitValue, "El limite debe ser dos");
    assert.strictEqual(
      json.data.length,
      limitValue,
      "El length de data debe ser de dos",
    );
  });

  test("Debe aplicar offset correctamente", async () => {
    const secondJob = "d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57";
    const offsetValue = 1;

    const response = await fetch(`${BASE_URL}?offset=${offsetValue}`);
    const json = await response.json();

    assert.strictEqual(json.data[0].id, secondJob);
  });
});

describe("POST /jobs", () => {
  test("El nuevo trabajo se añade correctamente con buen formato", async () => {
    const newJob = {
      titulo: "Software Engineer",
      empresa: "Google Inc",
      ubicacion: "California USA",
      descripcion:
        "We are looking for a software engineer with experience in web development",
    };

    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    const json = await response.json();
    const { id, ...jobData } = json;

    assert.strictEqual(response.status, 201, "El status code debe ser 201");
    assert.ok(id, "El trabajo devuelto debe tener un id generado");

    assert.deepStrictEqual(
      jobData,
      newJob,
      "Los datos devueltos deben coincidir con lo enviado",
    );
  });
});
