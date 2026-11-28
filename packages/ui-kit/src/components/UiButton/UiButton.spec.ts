import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiButton from './UiButton.vue'

describe('UiButton', () => {
  it('emits a click when enabled', async () => {
    const wrapper = mount(UiButton, { slots: { default: 'Save' } })
    expect(wrapper.text()).toContain('Save')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it.each([{ disabled: true }, { loading: true }])(
    'prevents interaction in state %j',
    async (props) => {
      const wrapper = mount(UiButton, { props })
      expect(wrapper.get('button').element.disabled).toBe(true)
      await wrapper.get('button').trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    },
  )

  it('applies the destructive variant', () => {
    const wrapper = mount(UiButton, { props: { variant: 'destructive' } })
    expect(wrapper.get('button').classes().join(' ')).toContain('destructive')
  })
})
