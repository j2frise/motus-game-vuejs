<template>
  <nav-bar
    :menu="menuItems"
    :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]">
    <nav-bar-item-plain
      display="flex lg:hidden"
      @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded">
      <base-icon
        :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
        size="24" />
    </nav-bar-item-plain>
    <nav-bar-item-plain
      display="hidden lg:flex xl:hidden"
      @click.prevent="isAsideLgActive = true">
      <base-icon
        :path="mdiMenu"
        size="24" />
    </nav-bar-item-plain>
  </nav-bar>
</template>

<script setup lang="ts">
  import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js';
  import { useRouter } from 'vue-router';
  import { useDarkModeStore } from '@/stores/darkMode';
  import { useMainStore } from '@/stores/main';
  import BaseIcon from '@/components/BaseIcon.vue';
  import NavBar from '@/components/NavBar.vue';
  import NavBarItemPlain from '@/components/NavBarItemPlain.vue';
  import { mdiThemeLightDark, mdiGithub } from '@mdi/js';
  import { storeToRefs } from 'pinia';
  import type { MenuItem } from '@/shared/type';

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
      icon: mdiGithub,
      label: 'GitHub',
      isDesktopNoLabel: true,
      href: 'https://github.com/j2frise?tab=repositories',
      target: '_blank',
    },
  ];

  const layoutAsidePadding = 'xl:pl-60';

  const darkModeStore = useDarkModeStore();
  const { isAsideLgActive, isAsideMobileExpanded } =
    storeToRefs(useMainStore());

  const router = useRouter();

  router.beforeEach(() => {
    isAsideMobileExpanded.value = false;
    isAsideLgActive.value = false;
  });

  const onToggleLightDark = () => {
    darkModeStore.set();
  };
</script>
