<template>
  <div
    class="flex items-center"
    :class="[type ?? '', noWrap ? 'flex-nowrap' : 'flex-wrap', mb ?? '']">
    <slot
      v-if="!!$slots.default"
      name="default" />
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  type Props = {
    noWrap?: boolean;
    type?: string;
    mb?: string;
  };

  defineProps<Props>();
</script>
