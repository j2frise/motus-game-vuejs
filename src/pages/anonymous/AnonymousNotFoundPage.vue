<template>
  <section-full-screen v-slot="{ cardClass }">
    <card-box :class="cardClass">
      <div class="space-y-3">
        <h1 class="text-2xl">Page non trouvée</h1>

        <p>Erreur 404</p>
      </div>

      <template #footer>
        <base-buttons>
          <base-button
            label="Retour à l'accueil"
            :icon="mdiHome"
            :to="{ name: routeNames.HOME.name }"
            color="danger" />
        </base-buttons>
      </template>
    </card-box>
  </section-full-screen>
</template>

<script setup lang="ts">
  import SectionFullScreen from '@/components/SectionFullScreen.vue';
  import CardBox from '@/components/CardBox.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import BaseButtons from '@/components/BaseButtons.vue';
  import { mdiHome } from '@mdi/js';
  import routeNames from '@/router/routerNames';
</script>
