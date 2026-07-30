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
