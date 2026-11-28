import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  test: {
    environment: 'jsdom',

    include: ['apps/**/*.{spec,test}.{ts,tsx}', 'packages/**/*.{spec,test}.{ts,tsx}'],

    exclude: [...configDefaults.exclude, '**/e2e/**', '**/dist/**'],

    setupFiles: ['./vitest.setup.ts'],

    clearMocks: true,
    restoreMocks: true,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      reportsDirectory: './coverage',

      include: ['apps/*/src/**/*.{ts,vue}', 'packages/*/src/**/*.{ts,vue}'],

      exclude: [
        '**/*.{spec,test}.ts',
        '**/__tests__/**',
        '**/*.d.ts',
        '**/*.types.ts',
        '**/index.ts',
        '**/main.ts',
      ],
    },
  },
})
