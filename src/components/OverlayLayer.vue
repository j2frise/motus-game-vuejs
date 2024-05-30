<template>
  <div
    :class="[type, zIndex]"
    class="items-center flex-col justify-center overflow-hidden fixed inset-0">
    <transition
      enter-active-class="transition duration-150 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div
        v-if="isVisible"
        class="overlay absolute inset-0 bg-gradient-to-tr opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700"
        @click="overlayClick" />
    </transition>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="animate-fade-out">
      <slot v-if="isVisible" />
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref } from 'vue';

  type Props = {
    zIndex?: string;
    type?: string;
  };

  withDefaults(defineProps<Props>(), {
    zIndex: 'z-50',
    type: 'flex',
  });

  const emit = defineEmits(['overlay-click']);
  const isVisible = ref(true);

  const overlayClick = (event: Event) => {
    emit('overlay-click', event);
  };
</script>
