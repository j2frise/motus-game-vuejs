<template>
  <div class="flex items-center justify-between mb-3">
    <h1 class="text-2xl">
      {{ title }}
    </h1>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';

  type Props = {
    title: string;
  };

  defineProps<Props>();
</script>
