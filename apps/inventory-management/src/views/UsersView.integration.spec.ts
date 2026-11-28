import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UsersView from './UsersView.vue'

const storageKey = 'inventory-management-users'
const otherKey = 'task-management-users'

describe('inventory-management user management integration', () => {
  async function openView() {
    const wrapper = mount(UsersView)
    await flushPromises()
    return wrapper
  }

  it('renders the native seed through the shared module', async () => {
    const wrapper = await openView()
    expect(wrapper.get('tbody').text()).toContain('Jamie Taylor')
    expect(wrapper.get('tbody').text()).toContain('jamie@example.com')
  })

  it('creates a user through the form and persists it across mounts', async () => {
    const wrapper = await openView()
    const add = wrapper.findAll('button').find((button) => button.text() === 'Add user')!
    await add.trigger('click')
    const form = wrapper.get('form')
    const fields = form.findAll('input:not([type="checkbox"])')
    await fields[0]!.setValue('Integration')
    await fields[1]!.setValue('User')
    await fields[2]!.setValue('integration@example.com')
    await fields[3]!.setValue('Tester')
    await form.trigger('submit')
    await flushPromises()
    expect(wrapper.get('tbody').text()).toContain('Integration User')
    expect(localStorage.getItem(storageKey)).toContain('integration@example.com')
    const reopened = await openView()
    expect(reopened.get('tbody').text()).toContain('Integration User')
  })

  it('updates an existing user through the shared form', async () => {
    const wrapper = await openView()
    await wrapper.get('tbody button').trigger('click')
    const form = wrapper.get('form')
    await form.get('input').setValue('Updated')
    await form.trigger('submit')
    await flushPromises()
    expect(wrapper.get('tbody').text()).toContain('Updated')
    expect(localStorage.getItem(storageKey)).toContain('Updated')
  })

  it('deletes a user after confirmation', async () => {
    const wrapper = await openView()
    const remove = wrapper.findAll('tbody button').find((button) => button.text() === 'Delete')!
    await remove.trigger('click')
    const dialog = wrapper.get('dialog[open]')
    const confirm = dialog.findAll('button').find((button) => button.text() === 'Delete')!
    await confirm.trigger('click')
    await flushPromises()
    expect(wrapper.get('tbody').text()).toContain('No matching users.')
    expect(localStorage.getItem(storageKey)).toBe('[]')
  })

  it('does not modify the other application storage', async () => {
    localStorage.setItem(otherKey, '[]')
    const wrapper = await openView()
    await wrapper.get('tbody button').trigger('click')
    const form = wrapper.get('form')
    await form.get('input').setValue('Isolated')
    await form.trigger('submit')
    await flushPromises()
    expect(localStorage.getItem(storageKey)).toContain('Isolated')
    expect(localStorage.getItem(otherKey)).toBe('[]')
  })
})
