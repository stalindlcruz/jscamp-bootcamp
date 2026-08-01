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

  await page.getByRole("button", { name: "Buscar" }).click();

  const jobsListing = page.locator(".jobs-listings");
  await expect(jobsListing).toBeVisible();

  const firstJob = jobsListing.getByRole("article").first();
  await expect(firstJob).toBeVisible();
});

test("Usuario aplicando a una oferta", async ({ page }) => {
  await page.goto("http://localhost:5173/search");

  const searchInput = page.getByRole("searchbox");
  await searchInput.fill("JavaScript");

  const firstJob = page.getByRole("article").first();
  await firstJob.click();

  const jobDetail = firstJob.locator("p");
  await expect(jobDetail).toBeVisible();

  const loginBtn = page.getByRole("button", { name: /iniciar sesión/i });
  await loginBtn.click();

  const applyBtn = firstJob.getByRole("button", { name: /aplicar/i });
  await applyBtn.click();

  const appliedBtn = firstJob.getByRole("button", { name: /aplicado/i });
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

test("Verificando la paginación", async ({ page }) => {
  await page.goto("http://localhost:5173/search");

  const searcInput = page.getByRole("searchbox");
  await searcInput.fill("developer");

  const jobCards = page.getByRole("article");
  await expect(jobCards.first()).toBeVisible();

  const firstPageResults = await jobCards.all();
  const firstPageResultsTitle = await Promise.all(
    firstPageResults.map((card) => card.locator("h3").textContent()),
  );

  const nav = page.getByRole("navigation", { name: /paginación/i });
  await expect(nav).toBeVisible();

  const nextBtn = nav.getByRole("link", { name: /siguiente/i });
  await nextBtn.click();

  const secondPageResults = await jobCards.all();
  const secondPageResultsTitle = await Promise.all(
    secondPageResults.map((card) => card.locator("h3").textContent()),
  );

  expect(firstPageResultsTitle).not.toEqual(secondPageResultsTitle);
});

test("Usuario aplicando a una oferta dentro del detalle", async ({ page }) => {
  await page.goto("http://localhost:5173/search");

  const firstJob = page.locator(".jobs-listings").getByRole("article").first();
  const jobLink = firstJob.getByRole("link").first();
  await jobLink.click();

  const pageDetails = page
    .getByRole("region", { name: /descripción/i })
    .first();
  await expect(pageDetails).toBeVisible();

  const loginBtn = page.getByRole("button", { name: /iniciar sesión/i });
  await loginBtn.click();

  const applyBtn = page.getByRole("button", { name: /aplicar/i });
  await expect(applyBtn).toBeVisible();
  await applyBtn.click();

  const appliedBtn = page.getByRole("button", { name: /aplicado/i });
  await expect(appliedBtn).toBeVisible();
});
