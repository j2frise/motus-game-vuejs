<template>
  <header
    class="flex items-stretch border-b border-gray-100 dark:border-slate-800">
    <div
      class="flex items-center py-3 grow font-bold"
      :class="[icon ? 'px-4' : 'px-6']">
      <base-icon
        v-if="icon"
        :path="icon"
        class="mr-3" />
      {{ title }}
    </div>
    <button
      v-if="buttonIcon"
      class="flex items-center p-2 justify-center ring-blue-700 focus:ring"
      @click="buttonClick">
      <base-icon :path="buttonIcon" />
    </button>
  </header>
</template>

<script setup lang="ts">
  import BaseIcon from '@/components/BaseIcon.vue';
  import { defineProps, defineEmits } from 'vue';

  type Props = {
    title: string;
    icon?: string | null;
    buttonIcon?: string | null;
  };

  withDefaults(defineProps<Props>(), {
    icon: null,
    buttonIcon: null,
  });

  const emit = defineEmits(['button-click']);

  const buttonClick = (event: MouseEvent) => {
    emit('button-click', event);
  };
</script>
