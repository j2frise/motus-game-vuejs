<template>
  <div
    :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }">
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
      <header-section />

      <aside-menu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @aside-lg-close-click="isAsideLgActive = false" />

      <main :class="containerMax">
        <router-with-transitions />
      </main>

      <footer-section />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMainStore } from '@/stores/main';
  import AsideMenu from '@/components/AsideMenu.vue';
  import RouterWithTransitions from '@/components/RouterWithTransitions.vue';
  import FooterSection from '@/layouts/section/FooterSection.vue';
  import HeaderSection from '@/layouts/section/HeaderSection.vue';
  import { storeToRefs } from 'pinia';
  import type { MenuItem } from '@/shared/type';
  import { mdiHome } from '@mdi/js';
  import { containerMax } from '@/shared/constant';
  import routeNames from '@/router/routerNames';

  const layoutAsidePadding = 'xl:pl-60';

  const { isAsideLgActive, isAsideMobileExpanded } =
    storeToRefs(useMainStore());

  const menuAside: MenuItem[] = [
    {
      to: {
        name: routeNames.HOME.name,
      },
      icon: mdiHome,
      label: 'Accueil',
    },
  ];
</script>
