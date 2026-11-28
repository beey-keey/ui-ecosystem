<script setup lang="ts">
import type { Brand, Theme } from "@ui-ecosystem/core";
const brand = defineModel<Brand>("brand", { required: true });
const theme = defineModel<Theme>("theme", { required: true });
</script>
<template>
  <div class="switcher">
    <label
      >Brand
      <select v-model="brand">
        <option value="academic">Academic</option>
        <option value="studio">Studio</option>
      </select></label
    >
    <label
      >Theme
      <select v-model="theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select></label
    >
  </div>
</template>
<style scoped>
.switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}
label {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
}
select {
  min-height: var(--control-size-md);
  padding-inline: var(--spacing-2);
  background: var(--color-surface);
  color: var(--color-text);
  border: var(--border-width-sm) solid var(--color-border-strong);
  border-radius: var(--radius-md);
}
</style>
