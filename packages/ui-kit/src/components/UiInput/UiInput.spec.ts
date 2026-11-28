import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiInput from './UiInput.vue'

describe('UiInput', () => {
  it('emits model updates', async () => {
    const wrapper = mount(UiInput, { props: { modelValue: '', label: 'Name' } })
    await wrapper.get('input').setValue('Alice')
    expect(wrapper.emitted('update:modelValue')).toEqual([['Alice']])
  })

  it('associates validation feedback with the input', () => {
    const wrapper = mount(UiInput, {
      props: { modelValue: '', id: 'name', label: 'Name', error: 'Required' },
    })
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('input').attributes('aria-describedby')).toBe('name-error')
    expect(wrapper.get('#name-error').text()).toBe('Required')
    expect(wrapper.get('label').attributes('for')).toBe('name')
  })

  it('supports disabled and readonly states', () => {
    const wrapper = mount(UiInput, {
      props: { modelValue: 'Alice', disabled: true, readonly: true },
    })
    expect(wrapper.get('input').element.disabled).toBe(true)
    expect(wrapper.get('input').element.readOnly).toBe(true)
  })
})
