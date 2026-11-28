import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeSwitcher from './ThemeSwitcher.vue'

describe('ThemeSwitcher', () => {
  it('renders the selected brand and theme', () => {
    const wrapper = mount(ThemeSwitcher, { props: { brand: 'academic', theme: 'light' } })
    expect(wrapper.get<HTMLSelectElement>('label:first-child select').element.value).toBe(
      'academic',
    )
    expect(wrapper.get<HTMLSelectElement>('label:last-child select').element.value).toBe('light')
  })

  it('emits brand and theme model updates', async () => {
    const wrapper = mount(ThemeSwitcher, { props: { brand: 'academic', theme: 'light' } })
    await wrapper.get('label:first-child select').setValue('studio')
    await wrapper.get('label:last-child select').setValue('dark')
    expect(wrapper.emitted('update:brand')).toEqual([['studio']])
    expect(wrapper.emitted('update:theme')).toEqual([['dark']])
  })
})
