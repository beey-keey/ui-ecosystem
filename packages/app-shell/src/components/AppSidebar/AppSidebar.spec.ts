import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import AppSidebar from './AppSidebar.vue'

const items = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: defineComponent({
      setup:
        (_, { attrs }) =>
        () =>
          h('svg', attrs),
    }),
  },
  { id: 'users', label: 'Users' },
]

describe('AppSidebar', () => {
  it('renders navigation and marks the active page', () => {
    const wrapper = mount(AppSidebar, {
      props: { appName: 'Test App', items, activeId: 'dashboard' },
    })
    expect(wrapper.text()).toContain('Test App')
    const buttons = wrapper.findAll('nav button')
    expect(buttons.map((button) => button.text())).toEqual(['Dashboard', 'Users'])
    expect(wrapper.get('[aria-current="page"]').text()).toBe('Dashboard')
    expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true')
  })

  it('emits the selected navigation id', async () => {
    const wrapper = mount(AppSidebar, {
      props: { appName: 'Test App', items, activeId: 'dashboard' },
    })
    await wrapper.get('nav button:last-child').trigger('click')
    expect(wrapper.emitted('navigate')).toEqual([['users']])
    await wrapper.setProps({ activeId: 'users' })
    expect(wrapper.get('[aria-current="page"]').text()).toBe('Users')
  })
})
