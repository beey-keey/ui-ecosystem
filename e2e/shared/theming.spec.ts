import { test, expect } from '@playwright/test'

test('switches brands and themes and persists the selection', async ({ page }) => {
  await page.goto('/')
  const brand = page.getByRole('combobox', { name: /Brand/i })
  const theme = page.getByRole('combobox', { name: /Theme/i })
  for (const value of ['academic', 'studio']) {
    await brand.selectOption(value)
    await expect(page.locator('html')).toHaveAttribute('data-brand', value)
    for (const mode of ['light', 'dark']) {
      await theme.selectOption(mode)
      await expect(page.locator('html')).toHaveAttribute('data-theme', mode)
    }
  }
  await page.reload()
  await expect(brand).toHaveValue('studio')
  await expect(theme).toHaveValue('dark')
  await expect(page.locator('html')).toHaveAttribute('data-brand', 'studio')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})
