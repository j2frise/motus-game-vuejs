<template>
  <div
    class="pt-14 min-h-screen w-screen lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
    <header-game-section />

    <main
      class="mt-8 pb-20"
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
  import routeNames from '@/router/routerNames';
  import { containerMax } from '@/shared/constant';
  import { useWordStore } from '@/stores/wordStore';
  import { useGameStore } from '@/stores/gameStore';
  import { storeToRefs } from 'pinia';
  import { onBeforeUnmount, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const wordStore = useWordStore();
  const gameStore = useGameStore();
  const router = useRouter();

  const { dictionary } = storeToRefs(wordStore);
  const { state: gameState, isInProgress } = storeToRefs(gameStore);

  onMounted(() => {
    wordStore.fetchDictionary().catch(() => {
      if (!dictionary.value) {
        alert('Erreur technique, le jeu ne peut pas démarrer');
        router.push({
          name: routeNames.HOME.name,
        });
      }
    });
  });

  onBeforeUnmount(handleBeforeUnload);

  function handleBeforeUnload(): void {
    const isPlayerCreated =
      gameState.value.player && gameState.value.difficulty;
    if (!isInProgress.value && isPlayerCreated) {
      gameStore.reset();
    }
  }
</script>
