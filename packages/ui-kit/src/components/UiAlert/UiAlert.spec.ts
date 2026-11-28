import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiAlert from './UiAlert.vue'

describe('UiAlert', () => {
  it('renders error feedback and emits dismissal', async () => {
    const wrapper = mount(UiAlert, {
      props: { variant: 'error', title: 'Error', dismissible: true },
      slots: { default: 'Try again' },
    })
    expect(wrapper.attributes('role')).toBe('alert')
    expect(wrapper.text()).toContain('Try again')
    await wrapper.get('button[aria-label="Dismiss message"]').trigger('click')
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })
})
