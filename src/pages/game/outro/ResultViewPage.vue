<template>
  <section-main>
    <section-title-line
      :icon="mdiGamepadSquare"
      title="Jeu de Motus : Résultat"
      main />

    <div
      class="banner-section grid grid-cols-1 gap-6 mb-6 lg:grid-cols-12 lg:p-12 lg:mb-12">
      <card-box
        form
        class="col-span-1 lg:col-span-8">
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div class="col-span-1 lg:col-span-5">
            <img
              :src="illustration"
              class="w-full"
              alt="Motus logo" />
          </div>
          <div class="col-span-1 lg:col-span-7 flex items-center">
            <div>
              <h1
                class="text-2xl mb-2"
                :class="{
                  'text-green-500': isWon,
                  'text-yellow-500': isLose,
                }">
                {{ result }}
              </h1>
              <h1 class="text-xl mb-3">
                Le mot était :
                <b class="text-red-500"> {{ state.word.toUpperCase() }} </b>
              </h1>
              <p class="lg:text-left">
                <span class="underline">Niveau </span> :
                <b>
                  {{ difficultyName?.toUpperCase() }} |
                  {{ difficultyGame }} lettres
                </b>
              </p>
              <p class="lg:text-left">
                <span class="underline">Nombre de tentatives </span> :
                <b> {{ state.attempts.length }} </b>
              </p>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-8">
          <base-buttons>
            <base-button
              :icon="mdiHome"
              label="Retour au menu"
              :to="{ name: routeNames.HOME.name }" />
          </base-buttons>

          <base-buttons>
            <base-button
              :icon="mdiViewList"
              label="Voir le tableau des résultats"
              :to="{ name: routeNames.RESULT.name }" />
          </base-buttons>

          <base-buttons>
            <base-button
              :icon="mdiReplay"
              color="info"
              label="Rejouer"
              :to="{ name: routeNames.REGISTER.name }" />
          </base-buttons>
        </div>
      </card-box>
    </div>
  </section-main>
</template>

<script setup lang="ts">
  import { mdiGamepadSquare, mdiHome, mdiReplay, mdiViewList } from '@mdi/js';
  import CardBox from '@/components/CardBox.vue';
  import SectionMain from '@/components/SectionMain.vue';
  import SectionTitleLine from '@/components/SectionTitleLine.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import BaseButtons from '@/components/BaseButtons.vue';
  import routeNames from '@/router/routerNames';
  import { computed, onBeforeMount } from 'vue';
  import { levelOptions } from '@/shared/constant';
  import { useGameStore } from '@/stores/gameStore';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import WinnerIllustration from '@/assets/win.gif';
  import LoserIllustration from '@/assets/lose.gif';

  const gameStore = useGameStore();

  const { isInProgress, difficultyGame, state } = storeToRefs(gameStore);
  const router = useRouter();

  const difficultyName = computed(() => {
    const option = levelOptions.find(
      option => option.id === state.value.difficulty,
    );
    return option?.label;
  });

  const isLose = state.value.gameOver;
  const isWon = !state.value.gameOver;

  const result = isWon
    ? `Félicitation ${state.value.player.toUpperCase()}, vous-avez gagnez !`
    : `Désolé ${state.value.player.toUpperCase()}, vous-avez perdu !`;
  const illustration = isWon ? WinnerIllustration : LoserIllustration;

  onBeforeMount(() => {
    const isPlayerCreated = !!state.value.player && state.value.difficulty;
    if (isInProgress.value || !isPlayerCreated) {
      router.push({
        name: routeNames.ERROR404.name,
      });
    }
  });
</script>

<style scoped>
  .banner-section {
    background-image: url('@/assets/speaker.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 25em;
    height: 100%;
  }
</style>
