<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, useId } from "vue";
import type { DialogProps } from "./UiDialog.types";
const props = withDefaults(defineProps<DialogProps>(), {
  closeOnBackdrop: true,
});
const model = defineModel<boolean>({ required: true });
const dialog = ref<HTMLDialogElement | null>(null);
const titleId = useId();
function sync() {
  const el = dialog.value;
  if (!el) return;
  if (model.value && !el.open) el.showModal();
  else if (!model.value && el.open) el.close();
}
function close() {
  model.value = false;
}
function backdrop(event: MouseEvent) {
  const element = dialog.value;

  if (!element || !props.closeOnBackdrop || event.target !== element) {
    return;
  }

  const rect = element.getBoundingClientRect();

  const isOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (isOutside) {
    model.value = false;
  }
}
onMounted(sync);
watch(model, sync, { flush: "post" });
onBeforeUnmount(() => {
  if (dialog.value?.open) dialog.value.close();
});
</script>

<template>
  <dialog
    ref="dialog"
    class="dialog"
    :aria-labelledby="titleId"
    @cancel.prevent="close"
    @close="close"
    @click="backdrop"
  >
    <header>
      <h2 :id="titleId">{{ title }}</h2>
      <button type="button" aria-label="Close dialog" @click="close">×</button>
    </header>
    <div class="body"><slot /></div>
    <footer v-if="$slots.footer"><slot name="footer" /></footer>
  </dialog>
</template>

<style scoped>
.dialog {
  width: min(32rem, calc(100% - var(--spacing-8)));
  max-height: 85vh;
  overflow: auto;
  padding: var(--spacing-6);
  background: var(--color-surface);
  color: var(--color-text);
  border: var(--border-width-sm) solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}
.dialog::backdrop {
  background: var(--color-overlay);
}
header,
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
}
h2 {
  font-size: var(--font-size-xl);
}
.body {
  margin-block: var(--spacing-4);
}
button {
  background: transparent;
  border: 0;
  color: inherit;
  font-size: var(--font-size-xl);
}
</style>
