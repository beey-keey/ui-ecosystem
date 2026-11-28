import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { useTheme } from './useTheme'

function setupTheme() {
  let state!: ReturnType<typeof useTheme>
  mount(
    defineComponent({
      setup() {
        state = useTheme({
          storageKey: 'test-theme',
          defaultBrand: 'academic',
          defaultTheme: 'light',
        })
        return () => null
      },
    }),
  )
  return state
}

describe('useTheme', () => {
  it('applies defaults to the document', () => {
    const state = setupTheme()
    expect(state.brand.value).toBe('academic')
    expect(state.theme.value).toBe('light')
    expect(document.documentElement.dataset.brand).toBe('academic')
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('updates and persists preferences', async () => {
    const state = setupTheme()
    state.setBrand('studio')
    state.toggleTheme()
    await nextTick()
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(JSON.parse(localStorage.getItem('test-theme') ?? '{}')).toEqual({
      brand: 'studio',
      theme: 'dark',
    })
    state.resetTheme()
    await nextTick()
    expect(state.brand.value).toBe('academic')
    expect(state.theme.value).toBe('light')
  })

  it('restores saved preferences', () => {
    localStorage.setItem('test-theme', JSON.stringify({ brand: 'studio', theme: 'dark' }))
    const state = setupTheme()
    expect(state.brand.value).toBe('studio')
    expect(state.theme.value).toBe('dark')
  })

  it('falls back to defaults for malformed storage', () => {
    localStorage.setItem('test-theme', 'invalid JSON')
    const state = setupTheme()
    expect(state.brand.value).toBe('academic')
    expect(state.theme.value).toBe('light')
  })
})
