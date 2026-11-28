import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiSelect from './UiSelect.vue'

describe('UiSelect', () => {
  it('renders options and emits selection changes', async () => {
    const wrapper = mount(UiSelect, {
      props: {
        modelValue: 'a',
        options: [
          { label: 'Alpha', value: 'a' },
          { label: 'Beta', value: 'b' },
        ],
      },
    })
    expect(wrapper.findAll('option')).toHaveLength(2)
    await wrapper.get('select').setValue('b')
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  })

  it('supports disabled options and validation', () => {
    const wrapper = mount(UiSelect, {
      props: {
        modelValue: '',
        options: [{ label: 'Unavailable', value: 'a', disabled: true }],
        error: 'Choose an option',
      },
    })
    expect(wrapper.get('option').element.disabled).toBe(true)
    expect(wrapper.get('select').attributes('aria-invalid')).toBe('true')
    expect(wrapper.text()).toContain('Choose an option')
  })
})
