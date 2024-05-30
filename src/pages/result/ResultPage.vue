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
        small />
    </section-title-line>

    <card-box
      class="mb-6"
      has-table>
      <table>
        <thead>
          <tr>
            <th>Joueur</th>
            <th>Ordi</th>
            <th>Point</th>
            <th>Résultat</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="client in itemsPaginated"
            :key="client.id">
            <td data-label="Name">
              {{ client.player }}
            </td>
            <td data-label="Company">
              {{ client.computer }}
            </td>
            <td data-label="City">
              <b>{{ client.playerScore }}</b> / {{ client.computerScore }}
            </td>
            <td
              data-label="Progress"
              class="lg:w-32">
              <div
                class="border rounded-full inline-flex items-center capitalize leading-none text-sm py-1.5 px-4"
                :class="colorsBgLight[client.isWin ? 'success' : 'danger']">
                <span>{{ client.isWin ? 'Gagné' : 'Perdu' }}</span>
              </div>
            </td>
            <td
              data-label="Created"
              class="lg:w-1 whitespace-nowrap">
              <small
                class="text-gray-500 dark:text-slate-400"
                :title="client.created"
                >{{ client.created }}</small
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <BaseLevel>
          <BaseButtons>
            <BaseButton
              v-for="page in pagesList"
              :key="page"
              :active="page === currentPage"
              :label="page + 1"
              :color="page === currentPage ? 'lightDark' : 'whiteDark'"
              small
              @click="currentPage = page" />
          </BaseButtons>
          <small>Page {{ currentPageGame }} of {{ numPages }}</small>
        </BaseLevel>
      </div>
    </card-box>

    <card-box>
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

  const items = computed(() => [
    {
      id: 1,
      player: 'John Doe',
      computer: 'Scarlet',
      playerScore: 15,
      computerScore: 35,
      isWin: false,
      created: '2024-01-15 16:00',
    },
  ]);

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
