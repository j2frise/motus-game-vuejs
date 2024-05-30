<template>
  <div class="mb-6 last:mb-0">
    <label
      v-if="label"
      :for="labelFor"
      class="block font-bold mb-2"
      >{{ label }}</label
    >
    <div :class="wrapperClass">
      <slot />
    </div>
    <div
      v-if="help"
      class="text-xs text-gray-500 dark:text-slate-400 mt-1">
      {{ help }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, useSlots } from 'vue';

  type Props = {
    label?: string | null;
    labelFor?: string;
    help?: string | null;
  };

  defineProps<Props>();

  const slots = useSlots();

  const wrapperClass = computed(() => {
    const base = [];
    const slotsLength = slots.default ? slots.default().length : 0;

    if (slotsLength > 1) {
      base.push('grid grid-cols-1 gap-3');
    }

    if (slotsLength === 2) {
      base.push('md:grid-cols-2');
    }

    return base;
  });
</script>
