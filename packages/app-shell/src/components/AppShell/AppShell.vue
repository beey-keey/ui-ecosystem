<script setup lang="ts">
import { ref, useId } from "vue";
import type { NavigationItem } from "../../types";
import AppSidebar from "../AppSidebar/AppSidebar.vue";
import AppHeader from "../AppHeader/AppHeader.vue";
defineProps<{
  appName: string;
  pageTitle: string;
  items: readonly NavigationItem[];
  activeId: string;
}>();
const emit = defineEmits<{ navigate: [id: string] }>();
const collapsed = ref(false);
const sidebarId = useId();
</script>
<template>
  <div class="shell" :class="{ collapsed }">
    <AppSidebar
      v-if="!collapsed"
      :id="sidebarId"
      :app-name="appName"
      :items="items"
      :active-id="activeId"
      @navigate="emit('navigate', $event)"
    />
    <div class="workspace">
      <AppHeader
        :title="pageTitle"
        :expanded="!collapsed"
        :controls="sidebarId"
        @toggle="collapsed = !collapsed"
      >
        <template #actions><slot name="header-actions" /></template>
      </AppHeader>
      <main class="content"><slot /></main>
    </div>
  </div>
</template>
<style scoped>
.shell {
  display: grid;
  grid-template-columns: 16rem minmax(0, 1fr);
  min-height: 100vh;
}
.shell.collapsed {
  grid-template-columns: minmax(0, 1fr);
}
.workspace {
  min-width: 0;
}
.content {
  padding: var(--spacing-6);
}
@media (max-width: 760px) {
  .shell {
    grid-template-columns: minmax(0, 1fr);
  }
  .content {
    padding: var(--spacing-4);
  }
}
</style>
