process.loadEnvFile();

import { test } from "node:test";
import assert from "node:assert";

import { Stagehand } from "@browserbasehq/stagehand";
import * as zod from "zod";

test("A user can like all jobs", async () => {
  const stagehand = new Stagehand({
    env: "LOCAL",
    verbose: 1,
    debugDom: true,
    model: "google/gemini-3.6-flash",
    modelClientOptions: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  });

  await stagehand.init();

  const [page] = stagehand.context.pages();

  await page.goto("http://localhost:5173");

  await stagehand.act("Click to 'Empleos'");
  await stagehand.act("Click to 'Iniciar Sesión'");

  const hearts = await stagehand.observe(
    "Find all heart icons in the 'Resultados de la Busqueda' section to like each job",
  );

  for (const heart of hearts) {
    await stagehand.act(heart);
  }

  const { total } = await stagehand.extract(
    "Extract the total's number next to the 'Perfil and heart icon in the page header.",
    zod.object({
      total: zod.string(),
    }),
  );

  assert.strictEqual(total, "4");

  await stagehand.close();
});
