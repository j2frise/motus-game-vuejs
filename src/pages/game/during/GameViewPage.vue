<template>
  <section-main>
    <section-title-line
      :icon="mdiGamepadSquare"
      title="Jeu de Motus : Jouer à la version test"
      main />
    <div
      class="banner-section grid grid-cols-1 gap-6 mb-6 lg:grid-cols-12 lg:p-12 lg:mb-12">
      <card-box
        form
        class="col-span-1 lg:col-span-7">
        <div
          class="flex flex-col space-y-3 mb-8 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
          <p class="text-center lg:text-left">
            <span class="underline">Joueur </span> : <b>{{ state.player }}</b>
          </p>
          <p class="text-center lg:text-right">
            {{ difficultyName?.toUpperCase() }} | {{ difficultyGame }} lettres
          </p>
        </div>
        <div class="overflow-x-auto p-4 flex justify-center">
          <table
            class="border-collapse"
            style="width: auto">
            <tbody>
              <tr
                v-for="index in attemptNb"
                :key="index"
                class="border border-white">
                <td
                  v-for="(cell, cellIndex) in getGrid(index).cells"
                  :key="cellIndex"
                  class="border border-white bg-blue-500 w-[3rem] h-[3rem] text-center"
                  style="padding: 0 !important">
                  <div
                    :data-testid="`motus_homepage_cell-display-status-${cellIndex}`"
                    class="flex justify-center items-center w-full h-full"
                    :class="{
                      'bg-yellow-500 rounded-full':
                        cell.present === true && cell.wellPlaced === false,
                      'bg-red-500':
                        cell.wellPlaced === true ||
                        (getGrid(index).isCurrent && isWin),
                    }">
                    <span
                      v-if="!getGrid(index).isEmpty"
                      class="uppercase font-bold text-3xl">
                      {{
                        (getGrid(index).isCurrent
                          ? userLetters[cellIndex]?.letter
                          : cell.letter) || '.'
                      }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <notification-bar
          v-model:isDismissed="isFoundWord"
          data-testid="motus_homepage_not-found-notification"
          :icon="mdiInformation">
          Le mot n'est pas dans notre dictionnaire
        </notification-bar>
      </card-box>
    </div>

    <div class="flex flex-col md:flex-row justify-between">
      <div
        class="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4">
        <p
          v-for="(instruction, index) in instructions"
          :key="index"
          class="flex items-center">
          <base-icon
            :path="instruction.icon"
            :color="instruction.color"
            w="w-8"
            h="h-8"
            size="25" />
          {{ instruction.title }}
        </p>
      </div>
      <div
        class="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
        <base-buttons>
          <base-button
            color="danger"
            :icon="mdiHome"
            label="Retour au menu"
            :to="{ name: routeNames.HOME.name }" />
        </base-buttons>

        <base-buttons>
          <base-button
            data-testid="motus_homepage_give-up-btn"
            :icon="mdiTrophyBroken"
            color="danger"
            label="Abandonner"
            @click.prevent="onGiveUp" />
        </base-buttons>
      </div>
    </div>
  </section-main>
</template>

<script setup lang="ts">
  import {
    mdiCircle,
    mdiGamepadSquare,
    mdiHome,
    mdiInformation,
    mdiSquare,
    mdiTrophyBroken,
  } from '@mdi/js';
  import CardBox from '@/components/CardBox.vue';
  import SectionMain from '@/components/SectionMain.vue';
  import SectionTitleLine from '@/components/SectionTitleLine.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import BaseButtons from '@/components/BaseButtons.vue';
  import NotificationBar from '@/components/NotificationBar.vue';
  import BaseIcon from '@/components/BaseIcon.vue';
  import routeNames from '@/router/routerNames';
  import {
    computed,
    onBeforeMount,
    onBeforeUnmount,
    ref,
    watchEffect,
  } from 'vue';
  import type { Grid } from '@/stores/type/Game';
  import { useGameStore } from '@/stores/gameStore';
  import { useWordStore } from '@/stores/wordStore';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { levelOptions } from '@/shared/constant';

  const gameStore = useGameStore();
  const wordStore = useWordStore();

  const { isInProgress, difficultyGame, attemptNb, emptyGridCells, state } =
    storeToRefs(gameStore);
  const router = useRouter();

  const instructions = [
    { title: 'Lettre absente', icon: mdiSquare, color: 'blue' },
    { title: 'Lettre mal placée', icon: mdiCircle, color: 'yellow' },
    { title: 'Lettre bien placée', icon: mdiSquare, color: 'red' },
  ];

  const userLetters = ref<{ letter: string; new: boolean }[]>([]);
  const isFoundWord = ref(true);
  const isWin = ref(false);

  const letters = computed(() =>
    state.value.grid
      .find(currentGrid => currentGrid.isCurrent)
      ?.cells?.map(cell => cell.letter),
  );

  const difficultyName = computed(() => {
    const option = levelOptions.find(
      option => option.id === state.value.difficulty,
    );
    return option?.label;
  });

  watchEffect(() => {
    const currentLetters = letters.value;

    if (!currentLetters) {
      for (let i = 0; i < difficultyGame.value; i++) {
        userLetters.value.push({ letter: '', new: true });
      }
    } else {
      userLetters.value = currentLetters.map(current => ({
        letter: current,
        new: false,
      }));
    }
  });

  onBeforeMount(() => {
    if (!isInProgress.value) {
      router.push({
        name: routeNames.REGISTER.name,
      });
    }
    window.addEventListener('keydown', handleKeyPress);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyPress);
  });

  const getGrid = (index: number): Grid => {
    const grid = state.value.grid[index - 1];
    if (!grid) {
      return (emptyGridCells.value ?? []) as Grid;
    }

    return grid;
  };

  function onGiveUp(): void {
    const comfirm = confirm(
      'Si vous abandonnez la partie elle sera considérée comme perdue.\nEtes-vous sûr(e) de continuer ?',
    );
    if (!comfirm) {
      return;
    }

    gameStore.forfeit();
    router.push({
      name: routeNames.RESULT.name,
    });
  }

  function handleKeyPress(event: KeyboardEvent): void {
    const char = event.key;
    const lowerChar = char.toLowerCase();

    if (/^[a-zA-Z]$/.test(char)) {
      onWrite(lowerChar);
    } else if (lowerChar === 'enter') {
      handleValidWord();
    } else if (lowerChar === 'backspace' || lowerChar === 'delete') {
      onDeleteLastLetter();
    }
  }

  function handleValidWord(): void {
    const getUserLetters = userLetters.value.map(
      userLetter => userLetter.letter,
    );
    const word = getUserLetters.join('');

    if (word.length !== difficultyGame.value) {
      return;
    }

    isFoundWord.value = wordStore.hasWordInDictionary(word);

    if (!isFoundWord.value) {
      return;
    }

    if (gameStore.addAttempt(word)) {
      isWin.value = true;
      goToResultGamePage();
    }

    if (state.value.gameOver) {
      isWin.value = false;
      goToResultGamePage();
    }
  }

  function onDeleteLastLetter(): void {
    const lastIndex = userLetters.value.length - 1;
    for (let i = lastIndex; i >= 0; i--) {
      if (userLetters.value[i]?.new && !!userLetters.value[i]?.letter) {
        userLetters.value[i].letter = '';
        return;
      }
    }
  }

  function onWrite(char: string): void {
    const emptyCell = userLetters.value.find(cell => !cell.letter);
    if (emptyCell) {
      emptyCell.letter = char;
      emptyCell.new = true;
    }
  }

  function goToResultGamePage(): void {
    setTimeout(() => {
      router.push({
        name: routeNames.RESULT_GAME.name,
      });
    }, 2000);
  }
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
