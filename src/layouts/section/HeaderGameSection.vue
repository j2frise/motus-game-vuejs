<template>
  <nav-bar
    :menu="menuItems"
    :class="[layoutAsidePadding]" />
</template>

<script setup lang="ts">
  import { useDarkModeStore } from '@/stores/darkMode';
  import NavBar from '@/components/NavBar.vue';
  import { mdiThemeLightDark, mdiClose } from '@mdi/js';
  import type { MenuItem } from '@/shared/type';
  import { useRouter } from 'vue-router';
  import routeNames from '@/router/routerNames';

  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      icon: mdiThemeLightDark,
      label: 'Light/Dark',
      isDesktopNoLabel: false,
      onClick: () => {
        onToggleLightDark();
      },
    },
    {
      icon: mdiClose,
      label: 'Quitter',
      color: 'danger',
      onClick: () => {
        onLeaveGame();
      },
    },
  ];

  const layoutAsidePadding = 'xl:pl-60';

  const darkModeStore = useDarkModeStore();

  const onToggleLightDark = (): void => {
    darkModeStore.set();
  };

  const onLeaveGame = (): void => {
    //
    router.push({
      name: routeNames.HOME.name,
    });
  };
</script>
