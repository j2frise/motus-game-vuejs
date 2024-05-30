<template>
  <div
    class="flex-1"
    :class="{ 'p-6': !noPadding }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';

  type Props = {
    noPadding: boolean;
  };

  defineProps<Props>();
</script>
