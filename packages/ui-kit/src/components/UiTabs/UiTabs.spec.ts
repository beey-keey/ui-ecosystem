import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiTabs from './UiTabs.vue'

describe('UiTabs', () => {
  it('emits selection and skips disabled tabs during keyboard navigation', async () => {
    const wrapper = mount(UiTabs, {
      props: {
        modelValue: 'a',
        tabs: [
          { label: 'Alpha', value: 'a' },
          { label: 'Disabled', value: 'b', disabled: true },
          { label: 'Gamma', value: 'c' },
        ],
      },
    })
    const tabs = wrapper.findAll('button')
    expect(tabs[0]?.attributes('aria-selected')).toBe('true')
    expect(tabs[1]?.element.disabled).toBe(true)
    await wrapper.get('button[aria-selected="true"]').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')).toEqual([['c']])
  })
})
