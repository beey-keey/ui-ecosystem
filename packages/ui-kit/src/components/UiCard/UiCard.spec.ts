import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiCard from './UiCard.vue'

describe('UiCard', () => {
  it('renders title, description and content slots', () => {
    const wrapper = mount(UiCard, {
      props: { title: 'Overview', description: 'Details', variant: 'accent' },
      slots: { default: 'Body', footer: 'Footer' },
    })
    expect(wrapper.get('h2').text()).toBe('Overview')
    expect(wrapper.text()).toContain('Details')
    expect(wrapper.text()).toContain('Body')
    expect(wrapper.get('footer').text()).toBe('Footer')
    expect(wrapper.classes()).toContain('accent')
  })
})
