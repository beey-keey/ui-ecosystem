<script setup lang="ts">
import type { CardProps } from "./UiCard.types";
withDefaults(defineProps<CardProps>(), { variant: "default" });
</script>

<template>
  <section class="card" :class="variant">
    <header v-if="title || description || $slots.header">
      <slot name="header"
        ><h2 v-if="title">{{ title }}</h2>
        <p v-if="description">{{ description }}</p></slot
      >
    </header>
    <div><slot /></div>
    <footer v-if="$slots.footer"><slot name="footer" /></footer>
  </section>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
  background: var(--color-surface);
  border: var(--border-width-sm) solid var(--color-border);
  border-radius: var(--radius-xl);
}
.accent {
  background: var(--color-accent);
  color: var(--color-on-accent);
}
.secondary {
  background: var(--color-secondary);
  color: var(--color-on-secondary);
}
h2 {
  color: inherit;
  font-size: var(--font-size-xl);
}
header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}
</style>
