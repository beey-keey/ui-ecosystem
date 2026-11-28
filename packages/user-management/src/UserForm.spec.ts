import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserForm from './UserForm.vue'
import { input } from './userManagementFixture'

describe('UserForm', () => {
  it('renders initial values', () => {
    const wrapper = mount(UserForm, { props: { initial: input, busy: false } })
    expect(
      wrapper
        .findAll('input')
        .map((field) => field.element.value)
        .slice(0, 4),
    ).toEqual([input.firstName, input.lastName, input.email, input.role])
    expect(wrapper.get<HTMLInputElement>('input[type="checkbox"]').element.checked).toBe(true)
  })
  it('trims values and emits save', async () => {
    const wrapper = mount(UserForm, { props: { initial: input, busy: false } })
    await wrapper.get('input').setValue('  Alex  ')
    await wrapper.get('input[type="checkbox"]').setValue(false)
    await wrapper.get('form').trigger('submit')
    expect(wrapper.emitted('save')).toEqual([[{ ...input, isActive: false }]])
  })
  it.each([{ firstName: ' ' }, { email: 'invalid' }])(
    'rejects invalid input %j',
    async (change) => {
      const wrapper = mount(UserForm, { props: { initial: { ...input, ...change }, busy: false } })
      await wrapper.get('form').trigger('submit')
      expect(wrapper.text()).toContain('Enter all fields and a valid email address.')
      expect(wrapper.emitted('save')).toBeUndefined()
    },
  )
  it('emits cancel', async () => {
    const wrapper = mount(UserForm, { props: { initial: input, busy: false } })
    await wrapper.get('button[type="button"]').trigger('click')
    expect(wrapper.emitted('cancel')).toEqual([[]])
  })
  it('disables controls while busy', () => {
    const wrapper = mount(UserForm, { props: { initial: input, busy: true } })
    expect(
      wrapper
        .findAll('input, button')
        .every((control) => control.attributes('disabled') !== undefined),
    ).toBe(true)
  })
})
