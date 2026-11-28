import { defineConfig, devices } from '@playwright/test'

const applications = [
  {
    name: 'task-management',
    port: 5173,
  },
  {
    name: 'inventory-management',
    port: 5174,
  },
]

const browsers = [
  {
    name: 'chromium',
    device: 'Desktop Chrome',
  },
  {
    name: 'firefox',
    device: 'Desktop Firefox',
  },
  {
    name: 'webkit',
    device: 'Desktop Safari',
  },
]

export default defineConfig({
  testDir: './e2e',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: applications.flatMap((app) =>
    browsers.map((browser) => ({
      name: `${app.name}-${browser.name}`,

      testMatch: ['**/shared/**/*.spec.ts', `**/${app.name}/**/*.spec.ts`],

      use: {
        ...devices[browser.device],
        baseURL: `http://localhost:${app.port}`,
      },
    })),
  ),

  webServer: applications.map((app) => ({
    command: `pnpm --filter ${app.name} dev`,
    url: `http://localhost:${app.port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  })),
})
