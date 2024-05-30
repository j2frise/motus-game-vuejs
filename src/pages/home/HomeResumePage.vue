<template>
  <section-main>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-20">
      <card-box-widget
        color="text-blue-500"
        :icon="mdiGamepadSquare"
        :number="nbCompletedGames"
        label="Total parties jouées" />
      <card-box-widget
        color="text-emerald-500"
        :icon="mdiTrophy"
        :number="nbWonGames"
        label="Total parties gagnées" />
      <card-box-widget
        color="text-yellow-500"
        :icon="mdiTimerSandFull"
        suffix="-"
        label="Total temps jeu" />
    </div>

    <section-banner
      class="mt-12 mb-8"
      :class="colorsBgLight.danger">
      <h1 class="text-xl">Prêt à défier votre esprit et votre vocabulaire ?</h1>
      <h1 class="text-xl mb-6"
        >Cliquez sur le bouton pour <b>démarrer votre aventure de mots !</b></h1
      >
      <div class="text-2xl">
        <base-button
          data-testid="motus_homepage_new-game-btn"
          :to="{
            name: routeNames.REGISTER.name,
          }"
          color="info"
          :icon="mdiPlayCircle"
          icon-size="100"
          label="Nouvelle partie"
          rounded-full
          :disabled="!dictionary" />
      </div>
    </section-banner>

    <section-banner class="banner-section mb-12" />
  </section-main>
</template>

<script setup lang="ts">
  import {
    mdiTrophy,
    mdiTimerSandFull,
    mdiPlayCircle,
    mdiGamepadSquare,
  } from '@mdi/js';
  import SectionMain from '@/components/SectionMain.vue';
  import CardBoxWidget from '@/components/CardBoxWidget.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import SectionBanner from '@/components/SectionBanner.vue';
  import { colorsBgLight } from '@/shared/colors';
  import routeNames from '@/router/routerNames';
  import { useGameStore } from '@/stores/gameStore';
  import { useWordStore } from '@/stores/wordStore';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';

  const wordStore = useWordStore();
  const gameStore = useGameStore();

  const { dictionary } = storeToRefs(wordStore);
  const { state: gameState } = storeToRefs(gameStore);

  const nbCompletedGames = computed(
    () => gameState.value.completedGames.length,
  );
  const nbWonGames = computed(
    () => gameState.value.completedGames.filter(game => !game.gameOver).length,
  );
</script>

<style scoped>
  .banner-section {
    background-image: url('@/assets/illustration.jpg');
    background-size: cover;
    background-position: center;
    height: 350px;
  }
</style>
