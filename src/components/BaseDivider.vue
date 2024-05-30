<template>
  <hr
    :class="
      navBar
        ? 'hidden lg:block lg:my-0.5 dark:border-slate-700'
        : 'my-6 -mx-6 dark:border-slate-800'
    "
    class="border-t border-gray-100" />
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  type Props = {
    navBar: boolean;
  };

  defineProps<Props>();
</script>
