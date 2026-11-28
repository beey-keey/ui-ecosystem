import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import RecordsView from './TasksView.vue'
import DashboardView from './DashboardView.vue'

async function openView() {
  const wrapper = mount(RecordsView, { global: { plugins: [createPinia()] } })
  await flushPromises()
  return wrapper
}

describe('Tasks view integration', () => {
  it('renders records and filters by search', async () => {
    const wrapper = await openView()
    expect(wrapper.get('tbody').text()).toContain('Review UI components')
    await wrapper.get('input[type="search"]').setValue('no-such-record-xyz')
    expect(wrapper.get('tbody').text()).toContain('No matching tasks.')
    await wrapper.get('input[type="search"]').setValue('')
    expect(wrapper.get('tbody').text()).toContain('Review UI components')
  })

  it('creates, edits and deletes a record through the form', async () => {
    const wrapper = await openView()
    const add = wrapper.findAll('button').find((button) => button.text() === 'Add task')
    if (!add) throw new Error('Missing add button')
    await add.trigger('click')
    const dialog = wrapper.get('dialog[open]')
    await dialog.get('input').setValue('Coverage record')
    await dialog.get('form').trigger('submit')
    await flushPromises()
    const row = wrapper.findAll('tbody tr').find((item) => item.text().includes('Coverage record'))
    if (!row) throw new Error('Created record missing')
    await row.get('button').trigger('click')
    await wrapper.get('form input').setValue('Updated coverage record')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    const updated = wrapper
      .findAll('tbody tr')
      .find((item) => item.text().includes('Updated coverage record'))
    if (!updated) throw new Error('Updated record missing')
    const remove = updated.findAll('button').find((button) => button.text() === 'Delete')
    if (!remove) throw new Error('Missing delete button')
    await remove.trigger('click')
    const confirm = wrapper
      .get('dialog[open]')
      .findAll('button')
      .find((button) => button.text() === 'Delete')
    if (!confirm) throw new Error('Missing confirmation button')
    await confirm.trigger('click')
    await flushPromises()
    expect(wrapper.get('tbody').text()).not.toContain('Updated coverage record')
  })

  it('cancels creation without changing the table', async () => {
    const wrapper = await openView()
    const before = wrapper.get('tbody').text()
    const add = wrapper.findAll('button').find((button) => button.text() === 'Add task')
    if (!add) throw new Error('Missing add button')
    await add.trigger('click')
    const cancel = wrapper
      .get('form')
      .findAll('button')
      .find((button) => button.text() === 'Cancel')
    if (!cancel) throw new Error('Missing cancel button')
    await cancel.trigger('click')
    expect(wrapper.get('tbody').text()).toBe(before)
  })

  it('renders dashboard metrics and navigates to the records page', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: DashboardView },
        { path: '/tasks', name: 'tasks', component: RecordsView },
      ],
    })
    await router.push('/')
    await router.isReady()
    const wrapper = mount(DashboardView, { global: { plugins: [createPinia(), router] } })
    expect(wrapper.findAll('.metric').map((metric) => metric.text())).toEqual(['3', '1', '1', '1'])
    const button = wrapper.findAll('button').find((item) => item.text() === 'View tasks')
    if (!button) throw new Error('Missing navigation button')
    await button.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('tasks')
  })
})
