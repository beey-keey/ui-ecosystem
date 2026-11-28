import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('Component Showcase App', () => {
  it('renders the shared component library', () => {
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('Component Showcase')
    expect(wrapper.text()).toContain('01 — Button')
    expect(wrapper.text()).toContain('02 — Input')
    expect(wrapper.text()).toContain('03 — Select')
    expect(wrapper.text()).toContain('04 — Card')
    expect(wrapper.text()).toContain('05 — Badge')
    expect(wrapper.text()).toContain('06 — Dialog')
    expect(wrapper.text()).toContain('07 — Table')
    expect(wrapper.text()).toContain('08 — Tabs')
    expect(wrapper.text()).toContain('09 — Alert')
  })
})
