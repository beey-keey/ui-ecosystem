<script setup lang="ts">
import { UiTable, UiBadge, UiButton } from '@ui-ecosystem/ui-kit'
import type { TableColumn } from '@ui-ecosystem/ui-kit'
import type { Task } from '../models/task'
defineProps<{ rows: Task[] }>()
const emit = defineEmits<{ edit: [row: Task]; remove: [row: Task] }>()
const columns: TableColumn[] = [
  { key: 'title', label: 'Task' },
  { key: 'priority', label: 'Priority' },
  { key: 'status', label: 'Status' },
  { key: 'dueDate', label: 'Due date' },
  { key: 'actions', label: 'Actions' },
]
</script>

<template>
  <UiTable
    :columns="columns"
    :rows="rows"
    row-key="id"
    caption="Task list"
    empty-text="No matching tasks."
  >
    <template #cell-priority="{ row }">
      <UiBadge
        :variant="
          row.priority === 'high' ? 'error' : row.priority === 'medium' ? 'warning' : 'neutral'
        "
      >
        {{ row.priority }}
      </UiBadge>
    </template>
    <template #cell-status="{ row }">
      <UiBadge
        :variant="
          row.status === 'completed' ? 'success' : row.status === 'in-progress' ? 'info' : 'neutral'
        "
      >
        {{
          row.status === 'completed'
            ? 'Completed'
            : row.status === 'in-progress'
              ? 'In progress'
              : 'To do'
        }}
      </UiBadge>
    </template>
    <template #cell-dueDate="{ row }">{{ row.dueDate || '—' }}</template>
    <template #cell-actions="{ row }">
      <div class="actions">
        <UiButton size="sm" variant="outline" @click="emit('edit', row)">Edit</UiButton>
        <UiButton size="sm" variant="destructive" @click="emit('remove', row)">Delete</UiButton>
      </div>
    </template>
  </UiTable>
</template>

<style scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
}
</style>
