<template>
  <div
    class="pt-14 min-h-screen w-screen lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
    <header-game-section />

    <main
      class="mt-8"
      :class="containerMax">
      <router-with-transitions />
    </main>

    <footer-section />
  </div>
</template>

<script setup lang="ts">
  import RouterWithTransitions from '@/components/RouterWithTransitions.vue';
  import FooterSection from '@/layouts/section/FooterSection.vue';
  import HeaderGameSection from '@/layouts/section/HeaderGameSection.vue';
  import { containerMax } from '@/shared/constant';
</script>
