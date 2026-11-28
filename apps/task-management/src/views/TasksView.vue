<script setup lang="ts">
import { computed, ref } from 'vue'
import { UiCard, UiButton, UiDialog, UiAlert } from '@ui-ecosystem/ui-kit'
import { useTaskStore } from '../features/tasks/stores/taskStore'
import type { Task, TaskInput } from '../features/tasks/models/task'
import TaskForm from '../features/tasks/components/TaskForm.vue'
import TaskFilters from '../features/tasks/components/TaskFilters.vue'
import TaskTable from '../features/tasks/components/TaskTable.vue'
const store = useTaskStore()
const search = ref<string | number>('')
const first = ref<string | number>('')
const second = ref<string | number>('')
const formOpen = ref(false)
const deleteOpen = ref(false)
const editing = ref<Task | null>(null)
const deleting = ref<Task | null>(null)
const message = ref('')
const initial = ref<TaskInput>({
  title: '',
  description: '',
  priority: 'medium',
  status: 'todo',
  dueDate: '',
})
const formKey = ref(0)

const rows = computed(() => {
  const q = String(search.value).trim().toLowerCase()
  return store.items.filter(
    (row) =>
      [row.title, row.description].some((value) => value.toLowerCase().includes(q)) &&
      (!first.value || row.status === first.value) &&
      (!second.value || row.priority === second.value),
  )
})
function openForm(row?: Task) {
  editing.value = row ?? null
  initial.value = row
    ? {
        title: row.title,
        description: row.description,
        priority: row.priority,
        status: row.status,
        dueDate: row.dueDate,
      }
    : { title: '', description: '', priority: 'medium', status: 'todo', dueDate: '' }
  message.value = ''
  formKey.value++
  formOpen.value = true
}
function save(input: TaskInput) {
  const ok = editing.value ? store.update(editing.value.id, input) : store.add(input)
  if (ok) formOpen.value = false
  else message.value = store.error || 'Unable to save record.'
}
function requestDelete(row: Task) {
  deleting.value = row
  message.value = ''
  deleteOpen.value = true
}
function confirmDelete() {
  if (!deleting.value) return
  if (store.remove(deleting.value.id)) deleteOpen.value = false
  else message.value = store.error || 'Unable to delete record.'
}
</script>
<template>
  <section class="page">
    <div class="heading">
      <div>
        <h1>Tasks</h1>
        <p>Manage your tasks.</p>
      </div>
      <UiButton @click="openForm()">Add task</UiButton>
    </div>
    <UiAlert v-if="store.error" variant="error">{{ store.error }}</UiAlert>
    <UiCard
      ><TaskFilters v-model:search="search" v-model:first="first" v-model:second="second"
    /></UiCard>
    <UiCard :title="`${rows.length} of ${store.total} tasks`"
      ><TaskTable :rows="rows" @edit="openForm" @remove="requestDelete"
    /></UiCard>
    <UiDialog
      v-model="formOpen"
      :title="editing ? 'Edit task' : 'Add task'"
      :close-on-backdrop="false"
    >
      <UiAlert v-if="message" variant="error">{{ message }}</UiAlert>
      <TaskForm
        v-if="formOpen"
        :key="formKey"
        :initial="initial"
        @save="save"
        @cancel="formOpen = false"
      />
    </UiDialog>
    <UiDialog v-model="deleteOpen" title="Delete task?" :close-on-backdrop="false">
      <p>Delete {{ deleting?.title }}? This action cannot be undone.</p>
      <UiAlert v-if="message" variant="error">{{ message }}</UiAlert>
      <template #footer
        ><UiButton variant="outline" @click="deleteOpen = false">Cancel</UiButton
        ><UiButton variant="destructive" @click="confirmDelete">Delete</UiButton></template
      >
    </UiDialog>
  </section>
</template>
<style scoped>
.page {
  display: grid;
  gap: var(--spacing-6);
  min-width: 0;
}
.heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
}
.heading p {
  color: var(--color-text-muted);
}
</style>
