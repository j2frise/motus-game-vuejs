<template>
  <section-main>
    <section-title-line
      :icon="mdiGamepadSquare"
      title="Jeu de Motus : enregistrement"
      main />

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 mb-20">
      <card-box
        form
        class="lg:col-span-8"
        @submit.prevent="submit">
        <div class="space-y-3 mb-8">
          <h1 class="text-2xl">Nouvelle Partie</h1>
          <p>
            Inscrivez-vous et plongez dans l'aventure de Motus en jouant avec
            l'ordi !
          </p>
        </div>

        <form-field
          label="Joueur"
          help="Entrez au moins 2 caractères">
          <form-control
            v-model="form.pseudo"
            placeholder="Mon pseudo" />
        </form-field>

        <form-field label="Sélectionnez le niveau">
          <form-control
            v-model="form.level"
            :options="levelOptions" />
        </form-field>

        <template #footer>
          <base-buttons>
            <base-button
              type="submit"
              color="info"
              label="Commencer"
              :disabled="!canSubmit" />
          </base-buttons>
        </template>
      </card-box>
      <card-box class="banner-section lg:col-span-4" />
    </div>
  </section-main>
</template>

<script setup lang="ts">
  import { mdiGamepadSquare } from '@mdi/js';
  import CardBox from '@/components/CardBox.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import BaseButtons from '@/components/BaseButtons.vue';
  import SectionMain from '@/components/SectionMain.vue';
  import SectionTitleLine from '@/components/SectionTitleLine.vue';
  import FormField from '@/components/FormField.vue';
  import FormControl from '@/components/FormControl.vue';
  import routeNames from '@/router/routerNames';
  import { computed, reactive } from 'vue';
  import { LEVEL } from '@/shared/enum';

  const levelOptions = [
    { id: LEVEL.easy , label: 'Facile' },
    { id: LEVEL.medium, label: 'Normal' },
    { id: LEVEL.hard, label: 'Difficile' },
  ];

  const form = reactive({
    pseudo: '',
    level: levelOptions[1],
  });

  const canSubmit = computed(
    () => form.level && form.pseudo.trim() && form.pseudo.trim().length > 1,
  );

  const submit = (): void => {
    //
  };
</script>

<style scoped>
  .banner-section {
    background-image: url('@/assets/motus-france2.png');
    background-size: cover;
    background-position: center;
    min-height: 25em;
    height: 100%;
  }
</style>
