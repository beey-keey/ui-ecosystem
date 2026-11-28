<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { UiCard, UiTable, UiBadge, UiButton, UiAlert } from '@ui-ecosystem/ui-kit'
import type { TableColumn } from '@ui-ecosystem/ui-kit'
import { useTaskStore } from '../features/tasks/stores/taskStore'

const store = useTaskStore()
const router = useRouter()
const pending = computed(() => store.total - store.completed - store.inProgress)
const columns: TableColumn[] = [
  { key: 'title', label: 'Task' },
  { key: 'priority', label: 'Priority' },
  { key: 'status', label: 'Status' },
  { key: 'dueDate', label: 'Due date' },
]
</script>

<template>
  <section class="dashboard">
    <div class="heading">
      <h1>Dashboard</h1>
      <p>Overview of your tasks and progress.</p>
    </div>
    <UiAlert v-if="store.error" variant="error">{{ store.error }}</UiAlert>
    <div class="metrics">
      <UiCard title="Total tasks" variant="accent">
        <p class="metric">{{ store.total }}</p>
      </UiCard>
      <UiCard title="In progress" variant="secondary">
        <p class="metric">{{ store.inProgress }}</p>
      </UiCard>
      <UiCard title="Completed">
        <p class="metric">{{ store.completed }}</p>
      </UiCard>
      <UiCard title="To do">
        <p class="metric">{{ pending }}</p>
      </UiCard>
    </div>
    <UiCard title="Task overview" description="Current tasks and their status.">
      <UiTable
        :columns="columns"
        :rows="store.items"
        row-key="id"
        caption="Task overview"
        empty-text="No tasks yet."
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
              row.status === 'completed'
                ? 'success'
                : row.status === 'in-progress'
                  ? 'info'
                  : 'neutral'
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
      </UiTable>
      <div class="section-actions">
        <UiButton variant="outline" @click="router.push({ name: 'tasks' })">View tasks</UiButton>
      </div>
    </UiCard>
  </section>
</template>

<style scoped>
.dashboard {
  display: grid;
  gap: var(--spacing-6);
  min-width: 0;
}
.heading {
  display: grid;
  gap: var(--spacing-2);
}
.heading p {
  color: var(--color-text-muted);
}
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: var(--spacing-4);
}
.metric {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
}
.section-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--spacing-4);
}
</style>
