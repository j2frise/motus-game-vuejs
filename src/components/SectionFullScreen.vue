<template>
  <div
    class="flex min-h-screen items-center justify-center"
    :class="colorClass">
    <slot card-class="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useDarkModeStore } from '@/stores/darkMode.js';
  import { gradientBgDark } from '@/shared/colors.js';

  const colorClass = computed(() => {
    if (useDarkModeStore().isEnabled) {
      return gradientBgDark;
    }

    return '';
  });
</script>
