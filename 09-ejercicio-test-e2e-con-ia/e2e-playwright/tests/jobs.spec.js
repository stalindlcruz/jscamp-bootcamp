/* Aquí irá el código de tu test */

// @ts-check
import { test, expect } from "@playwright/test";

test("Verifica que existe un buscador visible", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const searchBox = page.getByRole("searchbox");
  await expect(searchBox).toBeVisible();
});
