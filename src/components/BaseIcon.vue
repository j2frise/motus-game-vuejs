<template>
  <span :class="spanClass">
    <svg
      viewBox="0 0 24 24"
      :width="iconSize"
      :height="iconSize"
      class="inline-block">
      <path
        :fill="color"
        :d="path" />
    </svg>
    <slot />
  </span>
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue';

  type Props = {
    path: string;
    w?: string;
    h?: string;
    size?: string | number | null;
    color?: string;
  };

  const props = withDefaults(defineProps<Props>(), {
    w: 'w-6',
    h: 'h-6',
    size: undefined,
    color: 'currentColor',
  });

  const spanClass = computed(
    () => `inline-flex justify-center items-center ${props.w} ${props.h}`,
  );

  const iconSize = computed(() => props.size ?? 16);
</script>
