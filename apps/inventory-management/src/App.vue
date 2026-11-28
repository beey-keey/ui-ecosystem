<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '@ui-ecosystem/core'
import { AppShell, ThemeSwitcher } from '@ui-ecosystem/app-shell'
import type { NavigationItem } from '@ui-ecosystem/app-shell'
import { LayoutDashboard, Package, Users } from '@lucide/vue'

const router = useRouter()
const route = useRoute()

const { brand, theme } = useTheme({
  storageKey: 'inventory-management-theme',
  defaultBrand: 'studio',
  defaultTheme: 'light',
})

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'users', label: 'Users', icon: Users },
]

const activePage = computed(() => String(route.name ?? 'dashboard'))

const pageTitle = computed(
  () => navigationItems.find((item) => item.id === activePage.value)?.label ?? 'Dashboard',
)

function handleNavigation(id: string) {
  void router.push({ name: id })
}
</script>

<template>
  <AppShell
    app-name="Inventory Management"
    :page-title="pageTitle"
    :items="navigationItems"
    :active-id="activePage"
    @navigate="handleNavigation"
  >
    <template #header-actions>
      <ThemeSwitcher v-model:brand="brand" v-model:theme="theme" />
    </template>

    <RouterView />
  </AppShell>
</template>
