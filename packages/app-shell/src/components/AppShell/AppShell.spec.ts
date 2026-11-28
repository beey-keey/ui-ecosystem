import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppShell from './AppShell.vue'

const props = {
  appName: 'Test App',
  pageTitle: 'Dashboard',
  items: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'users', label: 'Users' },
  ],
  activeId: 'dashboard',
}

describe('AppShell', () => {
  it('renders the content and header actions', () => {
    const wrapper = mount(AppShell, {
      props,
      slots: { default: 'Page content', 'header-actions': 'Theme controls' },
    })
    expect(wrapper.get('main').text()).toBe('Page content')
    expect(wrapper.get('header').text()).toContain('Theme controls')
    expect(wrapper.get('aside').text()).toContain('Test App')
  })

  it('collapses and expands the sidebar', async () => {
    const wrapper = mount(AppShell, { props })
    const toggle = wrapper.get('header button')
    expect(toggle.attributes('aria-controls')).toBe(wrapper.get('aside').attributes('id'))
    await toggle.trigger('click')
    expect(wrapper.find('aside').exists()).toBe(false)
    expect(toggle.attributes('aria-expanded')).toBe('false')
    await toggle.trigger('click')
    expect(wrapper.find('aside').exists()).toBe(true)
    expect(toggle.attributes('aria-expanded')).toBe('true')
  })

  it('forwards navigation events', async () => {
    const wrapper = mount(AppShell, { props })
    await wrapper.get('nav button:last-child').trigger('click')
    expect(wrapper.emitted('navigate')).toEqual([['users']])
  })
})
