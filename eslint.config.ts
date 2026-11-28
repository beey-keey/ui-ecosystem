import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfigWithVueTs(
  {
    name: 'ui-ecosystem/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/.vite/**',
  ]),

  ...pluginVue.configs['flat/essential'],

  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['**/__tests__/**/*.{ts,tsx,js}', '**/*.spec.{ts,tsx,js}', '**/*.test.{ts,tsx,js}'],
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,

  {
    name: 'ui-ecosystem/vue-structure',
    files: ['**/*.vue'],
    rules: {
      'vue/padding-line-between-blocks': ['error', 'always'],

      'vue/singleline-html-element-content-newline': 'off',

      'vue/block-tag-newline': [
        'error',
        {
          singleline: 'always',
          multiline: 'always',
        },
      ],
    },
  },
)
