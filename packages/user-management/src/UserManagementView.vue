<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  UiButton,
  UiCard,
  UiInput,
  UiSelect,
  UiTable,
  UiBadge,
  UiDialog,
  UiAlert,
} from '@ui-ecosystem/ui-kit'
import type { TableColumn } from '@ui-ecosystem/ui-kit'
import type { User, UserInput, UserRepository } from '@ui-ecosystem/contracts'
import { useUserManagement } from './useUserManagement'
import UserForm from './UserForm.vue'
const props = defineProps<{ repository: UserRepository }>()
const { users, busy, error, load, save, remove } = useUserManagement(props.repository)
const search = ref<string | number>(''),
  status = ref<string | number>('all')
const statuses = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]
const columns: TableColumn[] = [
  { key: 'firstName', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'isActive', label: 'Status' },
  { key: 'actions', label: 'Actions' },
]
const rows = computed(() => {
  const q = String(search.value).trim().toLowerCase()
  return users.value.filter(
    (u) =>
      `${u.firstName} ${u.lastName} ${u.email} ${u.role}`.toLowerCase().includes(q) &&
      (status.value === 'all' || u.isActive === (status.value === 'active')),
  )
})
const formOpen = ref(false),
  deleteOpen = ref(false)
const editing = ref<User | null>(null),
  deleting = ref<User | null>(null)
const initial = ref<UserInput>({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  isActive: true,
})
const formKey = ref(0)
function openForm(user?: User) {
  editing.value = user ?? null
  initial.value = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      }
    : { firstName: '', lastName: '', email: '', role: '', isActive: true }
  error.value = ''
  formKey.value++
  formOpen.value = true
}
async function submit(input: UserInput) {
  if (await save(input, editing.value?.id)) formOpen.value = false
}
function requestDelete(user: User) {
  deleting.value = user
  error.value = ''
  deleteOpen.value = true
}
async function confirmDelete() {
  if (deleting.value && (await remove(deleting.value.id))) deleteOpen.value = false
}
onMounted(() => {
  void load()
})
</script>

<template>
  <section class="page">
    <div class="heading">
      <div>
        <h1>Users</h1>
        <p>Manage users and their status.</p>
      </div>
      <UiButton :disabled="busy" @click="openForm()">Add user</UiButton>
    </div>
    <UiAlert v-if="error && !formOpen && !deleteOpen" variant="error">
      {{ error }}
      <UiButton size="sm" variant="outline" :disabled="busy" @click="load()">
        Retry loading
      </UiButton>
    </UiAlert>
    <p v-if="busy" role="status">Processing…</p>
    <UiCard>
      <div class="filters">
        <UiInput v-model="search" label="Search" type="search" placeholder="Name, email or role" />
        <UiSelect v-model="status" label="Status" :options="statuses" />
      </div>
    </UiCard>
    <UiCard :title="`${rows.length} of ${users.length} users`">
      <UiTable
        :columns="columns"
        :rows="rows"
        row-key="id"
        caption="Users"
        empty-text="No matching users."
      >
        <template #cell-firstName="{ row }">{{ row.firstName }} {{ row.lastName }}</template>
        <template #cell-isActive="{ row }">
          <UiBadge :variant="row.isActive ? 'success' : 'neutral'">
            {{ row.isActive ? 'Active' : 'Inactive' }}
          </UiBadge>
        </template>
        <template #cell-actions="{ row }">
          <div class="actions">
            <UiButton size="sm" variant="outline" :disabled="busy" @click="openForm(row)">
              Edit
            </UiButton>
            <UiButton size="sm" variant="destructive" :disabled="busy" @click="requestDelete(row)">
              Delete
            </UiButton>
          </div>
        </template>
      </UiTable>
    </UiCard>
    <UiDialog
      v-model="formOpen"
      :title="editing ? 'Edit user' : 'Add user'"
      :close-on-backdrop="false"
    >
      <UiAlert v-if="error" variant="error">{{ error }}</UiAlert>
      <UserForm
        v-if="formOpen"
        :key="formKey"
        :initial="initial"
        :busy="busy"
        @save="submit"
        @cancel="formOpen = false"
      />
    </UiDialog>
    <UiDialog v-model="deleteOpen" title="Delete user?" :close-on-backdrop="false">
      <p>Delete {{ deleting?.firstName }} {{ deleting?.lastName }}? This cannot be undone.</p>
      <UiAlert v-if="error" variant="error">{{ error }}</UiAlert>
      <template #footer>
        <UiButton variant="outline" :disabled="busy" @click="deleteOpen = false">Cancel</UiButton>
        <UiButton variant="destructive" :loading="busy" @click="confirmDelete">Delete</UiButton>
      </template>
    </UiDialog>
  </section>
</template>

<style scoped>
.page {
  display: grid;
  gap: var(--spacing-6);
  min-width: 0;
}
.heading,
.actions,
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}
.heading {
  align-items: center;
  justify-content: space-between;
}
.heading p {
  color: var(--color-text-muted);
}
.filters > * {
  flex: 1 1 12rem;
}
</style>
