<template>
  <footer class="fixed bottom-0 w-full py-2 md:px-16 bg-white dark:bg-gray-800">
    <base-level>
      <div class="text-center md:text-left">
        <span>
          &copy; {{ year }},
          <a
            href="https://www.linkedin.com/in/jarceb/"
            target="_blank"
            class="text-red-500">
            Jarce Boukoro
          </a>
        </span>
        <slot />
        <slot />
      </div>
    </base-level>
  </footer>
</template>

<script setup lang="ts">
  import BaseLevel from '@/components/BaseLevel.vue';
  const year = new Date().getFullYear();
</script>

<style scoped>
  body {
    padding-bottom: 4rem;
  }
</style>
