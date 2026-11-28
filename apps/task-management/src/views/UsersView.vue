<script setup lang="ts">
import { UserManagementView } from '@ui-ecosystem/user-management'
import { TaskUserAdapter } from '../features/users/adapters/TaskUserAdapter'

const repository = new TaskUserAdapter()
</script>

<template>
  <UserManagementView :repository="repository" />
</template>
