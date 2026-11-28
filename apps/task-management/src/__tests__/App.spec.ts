import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from '../App.vue'

describe('Task Management App', () => {
  it('renders the application shell', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          name: 'dashboard',
          component: {
            template: '<div>Dashboard content</div>',
          },
        },
      ],
    })

    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router, createPinia()],
      },
    })

    expect(wrapper.text()).toContain('Task Management')
    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Tasks')
    expect(wrapper.text()).toContain('Users')
  })
})
