<template>
  <section
    class="p-6"
    :class="containerMax">
    <slot />
  </section>
</template>

<script setup lang="ts">
  import { containerMax } from '@/shared/constant';
</script>
