import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiBadge from './UiBadge.vue'

describe('UiBadge', () => {
  it('renders content and semantic variant', () => {
    const wrapper = mount(UiBadge, {
      props: { variant: 'success' },
      slots: { default: 'Completed' },
    })
    expect(wrapper.text()).toBe('Completed')
    expect(wrapper.classes()).toContain('success')
  })
})
