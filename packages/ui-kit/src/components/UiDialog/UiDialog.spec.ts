import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UiDialog from './UiDialog.vue'

describe('UiDialog', () => {
  it('renders the title and emits a close request', async () => {
    vi.spyOn(HTMLDialogElement.prototype, 'showModal').mockImplementation(function (
      this: HTMLDialogElement,
    ) {
      this.setAttribute('open', '')
    })
    vi.spyOn(HTMLDialogElement.prototype, 'close').mockImplementation(function (
      this: HTMLDialogElement,
    ) {
      this.removeAttribute('open')
    })
    const wrapper = mount(UiDialog, {
      props: { modelValue: false, title: 'Confirm' },
      slots: { default: 'Continue?' },
    })
    expect(wrapper.get('h2').text()).toBe('Confirm')
    expect(wrapper.text()).toContain('Continue?')
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.get('dialog').element.open).toBe(true)
    await wrapper.get('button[aria-label="Close dialog"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.get('dialog').element.open).toBe(false)
  })
})
