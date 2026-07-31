/* Aquí irá el código de tu test */

// @ts-check
import { test, expect } from "@playwright/test";

test("Verifica que existe un buscador visible", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const searcInput = page.getByRole("searchbox");
  await expect(searcInput).toBeVisible();
});

test("Simulando usuario buscando trabajo por tecnologiía", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const searcInput = page.getByRole("searchbox");
  await searcInput.fill("react");

  page.getByRole("button", { name: "Buscar" }).click();

  const jobsListing = page.locator(".jobs-listings");
  await expect(jobsListing).toBeVisible();

  const firstJob = jobsListing.getByRole("article").first();
  await expect(firstJob).toBeVisible();
});

test("Usuario aplicando a una oferta dentro del detalle", async ({ page }) => {
  await page.goto("http://localhost:5173/search");

  const searcInput = page.getByRole("searchbox");
  await searcInput.fill("javascript");

  const firstJob = page.locator(".jobs-listings").getByRole("article").first();
  const jobLink = firstJob.getByRole("link").first();
  await jobLink.click();

  const pageDetails = page
    .getByRole("region", { name: /descripción/i })
    .first();
  await expect(pageDetails).toBeVisible();

  const loginBtn = page.getByRole("button", { name: /iniciar sesion/i });
  await loginBtn.click();

  const applyBtn = page.getByRole("button", { name: /aplicar/i });
  await applyBtn.click();

  const appliedBtn = page.getByRole("button", { name: /aplicado/i });
  await expect(appliedBtn).toBeVisible();
});

test("Verificando los filtros de ubicación", async ({ page }) => {
  await page.goto("http://localhost:5173/search");

  const remoteFilter = page.getByRole("combobox", { name: /ubicación/i });
  await remoteFilter.selectOption("Remoto");

  const jobCards = page.getByRole("article");
  const allJobCards = await jobCards.all();

  for (const card of allJobCards) {
    await expect(card).toHaveAttribute("data-modalidad", /remoto/i);
  }

  const levelFilter = page.getByRole("combobox", { name: /experiencia/i });
  await levelFilter.selectOption("Senior");

  const updatedJobCards = await jobCards.all();

  for (const card of updatedJobCards) {
    await expect(card).toHaveAttribute("data-nivel", /senior/i);
  }
});
