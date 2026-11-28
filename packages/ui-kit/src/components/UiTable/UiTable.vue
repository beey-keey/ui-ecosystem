<script setup lang="ts" generic="T extends object">
import type { TableProps } from "./UiTable.types";
withDefaults(defineProps<TableProps<T>>(), { emptyText: "No results found." });
function cell(row: T, key: string): unknown {
  return row[key as keyof T];
}
</script>

<template>
  <div class="wrapper">
    <table>
      <caption class="visually-hidden">
        {{
          caption
        }}
      </caption>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :style="{ textAlign: column.align || 'left' }"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="String(row[rowKey])">
          <td
            v-for="column in columns"
            :key="column.key"
            :style="{ textAlign: column.align || 'left' }"
          >
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :value="cell(row, column.key)"
              >{{ cell(row, column.key) }}</slot
            >
          </td>
        </tr>
        <tr v-if="!rows.length">
          <td :colspan="Math.max(columns.length, 1)" class="empty">
            {{ emptyText }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.wrapper {
  overflow-x: auto;
}
table {
  width: 100%;
  font-size: var(--font-size-sm);
  border-collapse: collapse;
}
th,
td {
  padding: var(--spacing-4);
  border-bottom: var(--border-width-sm) solid var(--color-border);
}
th {
  background: var(--color-background);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
}
tbody tr:hover {
  background: var(--color-surface-hover);
}
.empty {
  text-align: center;
  color: var(--color-text-muted);
}
</style>
