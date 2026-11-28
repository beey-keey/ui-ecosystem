import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UserManagementView from './UserManagementView.vue'
import UserForm from './UserForm.vue'
import { makeRepository, input, user } from './userManagementFixture'

describe('UserManagementView', () => {
  it('loads and displays users', async () => {
    const repository = makeRepository()
    const wrapper = mount(UserManagementView, { props: { repository } })
    await flushPromises()
    expect(repository.list).toHaveBeenCalledTimes(1)
    expect(wrapper.get('tbody').text()).toContain('Alex Morgan')
    expect(wrapper.get('tbody').text()).toContain('Jamie Taylor')
  })
  it('filters by search and status', async () => {
    const wrapper = mount(UserManagementView, { props: { repository: makeRepository() } })
    await flushPromises()
    await wrapper.get('input[type="search"]').setValue('  JAMIE  ')
    expect(wrapper.get('tbody').text()).toContain('Jamie Taylor')
    expect(wrapper.get('tbody').text()).not.toContain('Alex Morgan')
    await wrapper.get('select').setValue('active')
    expect(wrapper.get('tbody').text()).toContain('No matching users.')
  })
  it('creates a user through the form', async () => {
    const repository = makeRepository()
    const wrapper = mount(UserManagementView, { props: { repository } })
    await flushPromises()
    await wrapper.get('.heading button').trigger('click')
    wrapper.getComponent(UserForm).vm.$emit('save', input)
    await flushPromises()
    expect(repository.create).toHaveBeenCalledWith(input)
    expect(wrapper.findComponent(UserForm).exists()).toBe(false)
    expect(wrapper.get('tbody').findAll('tr')).toHaveLength(3)
  })
  it('opens edit form with existing values and saves changes', async () => {
    const repository = makeRepository()
    const wrapper = mount(UserManagementView, { props: { repository } })
    await flushPromises()
    await wrapper.get('tbody button').trigger('click')
    const form = wrapper.getComponent(UserForm)
    expect(form.props('initial')).toEqual(input)
    const changed = { ...input, role: 'Lead' }
    form.vm.$emit('save', changed)
    await flushPromises()
    expect(repository.update).toHaveBeenCalledWith(user.id, changed)
    expect(wrapper.get('tbody').text()).toContain('Lead')
  })
  it('reports a load failure and retries', async () => {
    const repository = makeRepository()
    repository.list.mockRejectedValueOnce(new Error('Load failed'))
    const wrapper = mount(UserManagementView, { props: { repository } })
    await flushPromises()
    expect(wrapper.text()).toContain('Load failed')
    const retry = wrapper.findAll('button').find((button) => button.text() === 'Retry loading')
    expect(retry).toBeDefined()
    await retry?.trigger('click')
    await flushPromises()
    expect(wrapper.get('tbody').text()).toContain('Alex Morgan')
    expect(wrapper.text()).not.toContain('Load failed')
  })
  it('keeps the form open when creation fails', async () => {
    const repository = makeRepository()
    repository.create.mockRejectedValueOnce(new Error('Create failed'))
    const wrapper = mount(UserManagementView, { props: { repository } })
    await flushPromises()
    await wrapper.get('.heading button').trigger('click')
    wrapper.getComponent(UserForm).vm.$emit('save', input)
    await flushPromises()
    expect(wrapper.findComponent(UserForm).exists()).toBe(true)
    expect(wrapper.text()).toContain('Create failed')
  })
})
