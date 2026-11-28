<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { UiInput, UiButton, UiAlert } from '@ui-ecosystem/ui-kit'
import type { UserInput } from '@ui-ecosystem/contracts'
const props = defineProps<{ initial: UserInput; busy: boolean }>()
const emit = defineEmits<{ save: [input: UserInput]; cancel: [] }>()
const draft = reactive({ ...props.initial })
const error = ref('')
const fields = ['firstName', 'lastName', 'email', 'role'] as const
function model(key: (typeof fields)[number]) {
  return computed({
    get: () => draft[key],
    set: (value: string | number) => {
      draft[key] = String(value)
    },
  })
}
const firstName = model('firstName'),
  lastName = model('lastName'),
  email = model('email'),
  role = model('role')
function submit() {
  const input = {
    ...draft,
    firstName: draft.firstName.trim(),
    lastName: draft.lastName.trim(),
    email: draft.email.trim(),
    role: draft.role.trim(),
  }
  if (fields.some((key) => !input[key]) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    error.value = 'Enter all fields and a valid email address.'
    return
  }
  error.value = ''
  emit('save', input)
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <UiAlert v-if="error" variant="error">{{ error }}</UiAlert>
    <UiInput v-model="firstName" label="First name" required :disabled="busy" />
    <UiInput v-model="lastName" label="Last name" required :disabled="busy" />
    <UiInput v-model="email" label="Email" type="email" required :disabled="busy" />
    <UiInput v-model="role" label="Role" required :disabled="busy" />
    <label>
      <input v-model="draft.isActive" type="checkbox" :disabled="busy" />
      Active user
    </label>
    <div class="actions">
      <UiButton variant="outline" :disabled="busy" @click="emit('cancel')">Cancel</UiButton>
      <UiButton type="submit" :loading="busy">Save</UiButton>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  gap: var(--spacing-4);
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-2);
}
</style>
