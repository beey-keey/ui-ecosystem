<script setup lang="ts">
import { UserManagementView } from '@ui-ecosystem/user-management'
import { InventoryUserAdapter } from '../features/users/adapters/InventoryUserAdapter'
const repository = new InventoryUserAdapter()
</script>

<template>
  <UserManagementView :repository="repository" />
</template>
