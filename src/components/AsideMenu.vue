<template>
  <aside-menu-layer
    :menu="menu"
    :class="[
      isAsideMobileExpanded ? 'left-0' : '-left-60 lg:left-0',
      { 'lg:hidden xl:flex': !isAsideLgActive },
    ]"
    @aside-lg-close-click="asideLgCloseClick" />
  <overlay-layer
    v-show="isAsideLgActive"
    z-index="z-30"
    @overlay-click="asideLgCloseClick" />
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import AsideMenuLayer from '@/components/AsideMenuLayer.vue';
  import OverlayLayer from '@/components/OverlayLayer.vue';
  import type { MenuItem } from '@/shared/type';

  type Props = {
    menu: MenuItem[];
    isAsideMobileExpanded: boolean;
    isAsideLgActive: boolean;
  };

  defineProps<Props>();

  const emit = defineEmits(['aside-lg-close-click']);

  const asideLgCloseClick = (event: Event) => {
    emit('aside-lg-close-click', event);
  };
</script>
