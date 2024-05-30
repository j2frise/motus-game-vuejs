<template>
  <section-main>
    <section-title-line
      :icon="mdiTableBorder"
      title="Découvrez vos résultats : jeu de Motus"
      main>
      <base-button
        :to="{
          name: routeNames.REGISTER.name,
        }"
        :icon="mdiPlay"
        label="Nouvelle partie"
        color="info"
        rounded-full
        small
        :disabled="!dictionary" />
    </section-title-line>

    <card-box
      v-if="items.length"
      data-testid="motus_resultpage_result-games"
      class="mb-6"
      has-table>
      <table>
        <thead>
          <tr>
            <th>Joueur</th>
            <th>Nombre de tentatives</th>
            <th>Résultat</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(client, index) in itemsPaginated"
            :key="index">
            <td data-label="Player">
              {{ client.player }}
            </td>
            <td data-label="Attemps">
              <b>{{ client.attempts }}</b> / {{ attemptNb }}
            </td>
            <td
              data-label="Result"
              class="lg:w-32">
              <div
                class="border rounded-full inline-flex items-center capitalize leading-none text-sm py-1.5 px-4"
                :class="colorsBgLight[!client.gameOver ? 'success' : 'danger']">
                <span>{{ !client.gameOver ? 'Gagné' : 'Perdu' }}</span>
              </div>
            </td>
            <td data-label="Created">
              <small
                class="text-gray-500 dark:text-slate-400"
                :title="client.createdAt ?? ''"
                >{{ client.createdAt }}</small
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <base-level>
          <base-buttons>
            <base-button
              v-for="page in pagesList"
              :key="page"
              :data-testid="`motus_resultpage_pagination-btn-${page}`"
              :active="page === currentPage"
              :label="page + 1"
              :color="page === currentPage ? 'lightDark' : 'whiteDark'"
              small
              @click="currentPage = page" />
          </base-buttons>
          <small>Page {{ currentPageGame }} of {{ numPages }}</small>
        </base-level>
      </div>
    </card-box>

    <card-box
      v-else
      data-testid="motus_resultpage_empty-result-games">
      <div class="text-center py-24 text-gray-500 dark:text-slate-400">
        <p>Pas de partie trouvée.</p>
        <p
          >C'est le moment de jouer ! Lancez une partie pour découvrir vos
          résultats</p
        >
      </div>
    </card-box>
  </section-main>
</template>

<script setup lang="ts">
  import { mdiPlay, mdiTableBorder } from '@mdi/js';
  import SectionMain from '@/components/SectionMain.vue';
  import CardBox from '@/components/CardBox.vue';
  import SectionTitleLine from '@/components/SectionTitleLine.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import BaseLevel from '@/components/BaseLevel.vue';
  import BaseButtons from '@/components/BaseButtons.vue';
  import { computed, ref } from 'vue';
  import { colorsBgLight } from '@/shared/colors';
  import routeNames from '@/router/routerNames';
  import { useGameStore } from '@/stores/gameStore';
  import { useWordStore } from '@/stores/wordStore';
  import { storeToRefs } from 'pinia';

  const wordStore = useWordStore();
  const gameStore = useGameStore();

  const { dictionary } = storeToRefs(wordStore);
  const { state: gameState, attemptNb } = storeToRefs(gameStore);

  const items = computed(() =>
    gameStore.sortCompletedGamesByDate(gameState.value.completedGames),
  );

  const perPage = ref(10);
  const currentPage = ref(0);

  const itemsPaginated = computed(() =>
    items.value.slice(
      perPage.value * currentPage.value,
      perPage.value * (currentPage.value + 1),
    ),
  );

  const numPages = computed(() =>
    Math.ceil(items.value.length / perPage.value),
  );

  const currentPageGame = computed(() => currentPage.value + 1);

  const pagesList = computed(() => {
    const pagesList = [];

    for (let i = 0; i < numPages.value; i++) {
      pagesList.push(i);
    }

    return pagesList;
  });
</script>
