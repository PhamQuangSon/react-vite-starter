import { test, expect } from '@playwright/test'

test('homepage has welcome text', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Vite|React/i)
})
