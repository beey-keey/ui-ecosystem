<script setup lang="ts">
import { useTheme } from '@ui-ecosystem/core'

const { brand, theme } = useTheme({
  storageKey: 'task-management-theme',
  defaultBrand: 'academic',
  defaultTheme: 'light',
})
</script>

<template>
  <main class="showcase">
    <header class="showcase-header">
      <div class="heading">
        <span class="eyebrow">UI ECOSYSTEM / DESIGN SYSTEM</span>

        <h1>Task Management</h1>

        <p class="description">Shared foundations. Independent visual identities.</p>
      </div>

      <div class="settings">
        <label>
          Brand
          <select v-model="brand">
            <option value="academic">Academic</option>
            <option value="studio">Studio</option>
          </select>
        </label>

        <label>
          Theme
          <select v-model="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
    </header>

    <section class="metrics" aria-label="Overview">
      <article class="metric metric-accent">
        <span>Total tasks</span>
        <h2>24</h2>
      </article>

      <article class="metric metric-secondary">
        <span>In progress</span>
        <h2>8</h2>
      </article>

      <article class="metric">
        <span>Completed</span>
        <h2>16</h2>
      </article>
    </section>

    <section class="panel">
      <h3>Design System Preview</h3>

      <p class="description">This application consumes the shared Design System package.</p>

      <div class="actions">
        <button type="button" class="button-primary">Primary action</button>

        <button type="button" class="button-secondary">Secondary action</button>

        <button type="button" class="button-accent">Accent action</button>
      </div>

      <div class="feedback feedback-success">Success — your changes have been saved.</div>

      <div class="feedback feedback-error">Error — something went wrong.</div>

      <div class="feedback feedback-warning">Warning — you have unsaved changes.</div>

      <div class="feedback feedback-info">Information — a new update is available.</div>
    </section>
  </main>
</template>

<style scoped>
.showcase {
  max-width: 1120px;
  margin-inline: auto;
  padding: var(--spacing-12) var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.showcase-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--spacing-6);
}

.heading {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.eyebrow {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-muted);
}

.description {
  color: var(--color-text-muted);
}

.settings {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.settings label {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
}

.settings select {
  min-height: var(--control-size-md);
  padding-inline: var(--spacing-3);
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-4);
}

.metric {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  padding: var(--spacing-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.metric-accent {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.metric-secondary {
  background: var(--color-secondary);
  color: var(--color-on-secondary);
}

.metric h2 {
  color: inherit;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  margin-block: var(--spacing-2);
}

.actions button {
  min-height: var(--control-size-md);
  padding: var(--spacing-2) var(--spacing-4);
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  transition: background-color var(--duration-fast) var(--easing-default);
}

.button-primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.button-primary:hover {
  background: var(--color-primary-hover);
}

.button-secondary {
  background: var(--color-secondary);
  color: var(--color-on-secondary);
}

.button-secondary:hover {
  background: var(--color-secondary-hover);
}

.button-accent {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.button-accent:hover {
  background: var(--color-accent-hover);
}

.feedback {
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.feedback-success {
  background: var(--color-success-background);
  color: var(--color-success);
}

.feedback-error {
  background: var(--color-error-background);
  color: var(--color-error);
}

.feedback-warning {
  background: var(--color-warning-background);
  color: var(--color-warning);
}

.feedback-info {
  background: var(--color-info-background);
  color: var(--color-info);
}

@media (max-width: 640px) {
  .showcase {
    padding: var(--spacing-6) var(--spacing-4);
  }

  .metrics {
    grid-template-columns: 1fr;
  }
}
</style>
