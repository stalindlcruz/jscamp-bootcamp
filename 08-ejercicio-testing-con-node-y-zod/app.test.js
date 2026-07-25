import assert from "node:assert";
import { after, before, describe, test } from "node:test";

import app from "./app.js";
import { DEFAULTS } from "./config.js";

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
    const responseJobs = await fetch(`${BASE_URL}`);
    const jobs = await responseJobs.json();

    const randomIndex = Math.floor(Math.random() * jobs.data.length);
    const randomJob = jobs.data[randomIndex];

    const randomIndexTech = Math.floor(
      Math.random() * randomJob.data.technology.length,
    );

    const tech = randomJob.data.technology[randomIndexTech];

    const response = await fetch(`${BASE_URL}?technology=${tech}`);
    const json = await response.json();

    assert.ok(json.data.every((job) => job.data.technology.includes(tech)));
  });

  test("Debe respetar el límite de resultados", async () => {
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
    const offsetValue = 1;

    const fetchJobs = await fetch(`${BASE_URL}`);
    const jsonJobs = await fetchJobs.json();
    const secondJobId = jsonJobs.data[offsetValue].id;

    /*
    Genial! Una alternativa para no depender de un ID hardcodeado es:
    - Hacer una petición para obtener todos los jobs
    - Guardar en una variable el job con id = offset
    - Hacer la petición que hiciste aquí abajo
    - Comparar el ID del job que guardamos en variable con el primer job de la petición
    */

    const response = await fetch(`${BASE_URL}?offset=${offsetValue}`);
    const json = await response.json();

    assert.strictEqual(json.data[0].id, secondJobId);
  });
});

describe("GET /jobs/:id", () => {
  test("Debe devolver el trabajo con ID especificado", async () => {
    const fetchJobs = await fetch(`${BASE_URL}`);
    const jsonJobs = await fetchJobs.json();

    const randomIndex = Math.floor(Math.random() * jsonJobs.data.length);
    const jobId = jsonJobs.data[randomIndex].id;

    const response = await fetch(`${BASE_URL}/${jobId}`);
    const json = await response.json();

    /* 
    Muy bien!
    Una alternativa es obtener todos los jobs, agarrar uno random y usar ese ID para hacer el test
    */

    assert.strictEqual(response.status, 200, "Debe devolver status code 200");
    assert.strictEqual(json.id, jobId, "El ID coincide con el devuelto");
  });

  test("Debe devolver 404 cuando el ID no existe", async () => {
    const jobId = "d35b2c89-5d60";
    const response = await fetch(`${BASE_URL}/${jobId}`);
    const json = await response.json();

    assert.strictEqual(response.status, 404, "Debe devolver status code 404");
    assert.ok(json.error);
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

  test("Titulo con menos de 3 caracteres debe devolver status code 400", async () => {
    const newJob = {
      titulo: "So",
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

    assert.strictEqual(response.status, 400, "El status code debe ser 404");
  });

  test("Titulo con mas de 100 caracteres debe devolver status code 400", async () => {
    const newJob = {
      titulo:
        /* "Sokljasdkafjskjjasdfajadadkjfadskljfsdafdsakjfdskljfdsjdfjkladsjdsljkdffadsjfsdljfdsakldfsjaflddfkasjkldfjaklsjasdklsdfljfsdasdlkkdsldjsdfklasdfjfsdalkkksladjaskdljlsdjkldjfaksljdlfasdjdaksljslkfdjaldjadakslasljsfsdkljdlkdsjlkdsjdlkjdsklajdsklsdjklasjkadfsjkaljdkljskdsjafdsajkaskldsaj", */
        "a".repeat(101), // <- Queda mas claro :)
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

    assert.strictEqual(response.status, 400, "El status code debe ser 404");
  });

  test("Sin campo titulo debe devolver status code 400", async () => {
    const newJob = {
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

    assert.strictEqual(response.status, 400, "El status code debe ser 404");
  });

  test("Titulo diferente a string debe devolver 400", async () => {
    const newJob = {
      titulo: {},
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

    assert.strictEqual(response.status, 400, "El status code debe ser 404");
  });

  test("Sin campo descripcion (es opcional) debe devolver status code 201", async () => {
    const newJob = {
      titulo: "Software Engineer",
      empresa: "Google Inc",
      ubicacion: "California USA",
    };

    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    assert.strictEqual(response.status, 201, "El status code debe ser 201");
  });
});

describe("PUT /jobs/:id", () => {
  test("Debe devolver status code 204 y actualizar el trabajo", async () => {
    const newJob = {
      titulo: "Software Engineer",
      empresa: "Google Inc",
      ubicacion: "California USA",
      descripcion:
        "We are looking for a software engineer with experience in web development",
    };

    const responseNewJob = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    const jsonNewJob = await responseNewJob.json();
    const jobId = jsonNewJob.id;

    const updateData = {
      titulo: "Senior Software Engineer",
      empresa: "Meta",
      ubicacion: "Remoto",
      descripcion:
        "We are looking for a software engineer with experience in web development",
    };

    const updateJob = await fetch(`${BASE_URL}/${jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    assert.strictEqual(updateJob.status, 204, "Debe devolver status code 204");

    const response = await fetch(`${BASE_URL}/${jobId}`);
    const jobUpdated = await response.json();
    const { id, ...jobData } = jobUpdated;

    assert.deepStrictEqual(updateData, jobData, "Se actualizo el job");

    const deleteJob = await fetch(`${BASE_URL}/${jobId}`, { method: "DELETE" });
    assert.strictEqual(deleteJob.status, 204, "Debe eliminarse correctamente");
  });

  test("Debe devolver status code 404 cuando el ID no existe", async () => {
    const jobId = "d35b2c89-5d60-4f26";

    const newJob = {
      titulo: "Software Engineer",
      empresa: "Google Inc",
      ubicacion: "California USA",
      descripcion:
        "We are looking for a software engineer with experience in web development",
    };

    const updateJob = await fetch(`${BASE_URL}/${jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    assert.strictEqual(updateJob.status, 404, "Debe devolver status code 404");
  });
});

describe("PATCH jobs/:id", () => {
  test("Debe devolver status code 204 y actualizar solo los campos enviados del trabajo", async () => {
    const newJob = {
      titulo: "Software Engineer",
      empresa: "Google Inc",
      ubicacion: "California USA",
      descripcion:
        "We are looking for a software engineer with experience in web development",
    };

    const createJob = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    const createdJob = await createJob.json();
    const jobId = createdJob.id;

    const partialUpdate = {
      titulo: "Senior Software Engineer",
      ubicacion: "Remote",
    };

    const originalResponse = await fetch(`${BASE_URL}/${jobId}`);
    const originalJob = await originalResponse.json();

    const {
      titulo: originalTitulo,
      ubicacion: originalUbicacion,
      ...originalData
    } = originalJob;

    const updateJob = await fetch(`${BASE_URL}/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partialUpdate),
    });

    assert.strictEqual(updateJob.status, 204, "El status code debe ser 204");

    const responseUpdated = await fetch(`${BASE_URL}/${jobId}`);
    const jobUpdated = await responseUpdated.json();

    const {
      titulo: updateTitulo,
      ubicacion: updateUbicacion,
      ...updateData
    } = jobUpdated;

    assert.strictEqual(
      partialUpdate.titulo,
      updateTitulo,
      "El campo enviado tiene el nuevo valor",
    );

    assert.strictEqual(
      partialUpdate.ubicacion,
      updateUbicacion,
      "El campo enviado tiene el nuevo valor",
    );

    assert.deepStrictEqual(
      originalData,
      updateData,
      "Los campos restantes tienen el mismo valor",
    );

    const deleteJob = await fetch(`${BASE_URL}/${jobId}`, { method: "DELETE" });
    assert.strictEqual(deleteJob.status, 204, "Debe eliminarse correctamente");
  });

  test("Debe devolver status code 404 cuando el ID no existe", async () => {
    const jobId = "d35b2c89-5d60-4f";

    const partialUpdate = {
      titulo: "Software Engineer",
      ubicacion: "California USA",
    };

    const updateJob = await fetch(`${BASE_URL}/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partialUpdate),
    });

    assert.strictEqual(
      updateJob.status,
      404,
      "Debe devolver status code 404 cuando id no existe",
    );
  });
});

describe("DELETE jobs/:id", () => {
  test("Debe devolver status code 204 y eliminar un trabajo", async () => {
    /* Una cosa que podemos hacer es crear un test nuevo, verificar que existe y luego borrarlo, verificando que ya no existe más. Así no tocamos items existentes */

    const newJob = {
      titulo: "Software Engineer",
      empresa: "Google Inc",
      ubicacion: "California USA",
      descripcion:
        "We are looking for a software engineer with experience in web development",
    };

    const createJob = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    const createdJob = await createJob.json();
    const jobId = createdJob.id;

    const checkResponse = await fetch(`${BASE_URL}/${jobId}`);
    assert.strictEqual(checkResponse.status, 200, "El job creado debe existir");

    const deleteJob = await fetch(`${BASE_URL}/${jobId}`, { method: "DELETE" });
    assert.strictEqual(deleteJob.status, 204, "Debe devolver status code 204");

    const response = await fetch(`${BASE_URL}/${jobId}`);
    assert.strictEqual(response.status, 404, "Debe devolver 404");
  });

  test("Debe devolver status code 404 cuando el ID no existe", async () => {
    const jobId = "f62d8a34-923a-4ac2-9b0b-sdsdsd";

    const deleteJob = await fetch(`${BASE_URL}/${jobId}`, { method: "DELETE" });
    assert.strictEqual(deleteJob.status, 404, "Debe devolver status code 404");
  });
});
