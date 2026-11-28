import { test, expect } from '@playwright/test'

test.describe('Application navigation', () => {
  test('loads the application dashboard', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()

    await expect(page.getByRole('button', { name: 'Dashboard', exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  test('navigates to the shared user management module', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Users', exact: true }).click()

    await expect(page).toHaveURL(/\/users$/)

    await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible()

    await expect(page.getByRole('button', { name: 'Add user', exact: true })).toBeVisible()
  })

  test('returns to the dashboard', async ({ page }) => {
    await page.goto('/users')

    await page.getByRole('button', { name: 'Dashboard', exact: true }).click()

    await expect(page.getByRole('button', { name: 'Dashboard', exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    )

    await expect(page).toHaveURL(/\/$/)
  })
})
