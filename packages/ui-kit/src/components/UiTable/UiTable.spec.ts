import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiTable from './UiTable.vue'

interface User {
  id: number
  name: string
}

describe('UiTable', () => {
  it('renders columns, rows and custom cells', () => {
    const wrapper = mount(UiTable<User>, {
      props: {
        columns: [{ key: 'name', label: 'Name' }],
        rows: [{ id: 1, name: 'Alice' }],
        rowKey: 'id',
        caption: 'Users',
      },
      slots: {
        'cell-name': 'Custom cell',
      },
    })

    expect(wrapper.get('th').text()).toBe('Name')
    expect(wrapper.get('td').text()).toBe('Custom cell')
    expect(wrapper.get('caption').text()).toBe('Users')
  })

  it('renders an empty state', () => {
    const wrapper = mount(UiTable<User>, {
      props: {
        columns: [{ key: 'name', label: 'Name' }],
        rows: [],
        rowKey: 'id',
        caption: 'Users',
        emptyText: 'No users',
      },
    })

    expect(wrapper.get('tbody').text()).toBe('No users')
  })
})
