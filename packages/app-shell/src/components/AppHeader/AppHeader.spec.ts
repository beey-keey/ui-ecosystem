import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from './AppHeader.vue'

describe('AppHeader', () => {
  it('renders the title and actions', () => {
    const wrapper = mount(AppHeader, {
      props: { title: 'Dashboard', expanded: true, controls: 'sidebar' },
      slots: { actions: 'Header actions' },
    })
    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Header actions')
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('button').attributes('aria-controls')).toBe('sidebar')
  })

  it('emits toggle and reflects collapsed state', async () => {
    const wrapper = mount(AppHeader, {
      props: { title: 'Dashboard', expanded: false, controls: 'sidebar' },
    })
    expect(wrapper.get('button').text()).toBe('Show menu')
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('button').attributes('aria-controls')).toBeUndefined()
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('toggle')).toHaveLength(1)
  })
})
