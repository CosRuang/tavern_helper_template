<template>
  <nav class="tabnav">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="tabnav__btn"
      :class="{ 'tabnav__btn--active': modelValue === tab.id }"
      type="button"
      @click="$emit('update:modelValue', tab.id)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const tabs = [
  { id: '伊莲娜', label: '伊莲娜' },
  { id: '里克', label: '里克' },
  { id: '城堡', label: '城堡档案' },
];
</script>

<style lang="scss" scoped>
.tabnav {
  display: flex;
  border-bottom: 1px solid var(--c-border);
  background: var(--c-surface);
}

.tabnav__btn {
  flex: 1;
  padding: 9px 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--c-text-muted);
  font-family: var(--font-title);
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
}

.tabnav__btn:hover {
  color: var(--c-text);
  background: var(--c-surface-2);
}

.tabnav__btn--active {
  color: var(--c-primary);
  border-bottom-color: var(--c-primary);
  font-weight: 700;
}
</style>
