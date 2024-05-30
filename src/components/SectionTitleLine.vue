<template>
  <section class="mb-6 flex items-center justify-between pt-6">
    <div class="flex items-center justify-start">
      <BaseIcon
        v-if="icon"
        :path="icon"
        class="mr-2"
        size="40" />
      <h1 class="leading-tight text-2xl">
        {{ title }}
      </h1>
    </div>
    <slot v-if="hasSlot" />
  </section>
</template>

<script lang="ts" setup>
  import { defineProps, computed, useSlots } from 'vue';
  import BaseIcon from '@/components/BaseIcon.vue';

  interface Props {
    icon?: string | null;
    title: string;
  }

  defineProps<Props>();

  const hasSlot = computed(() => useSlots().default);
</script>
