<template>
  <nav
    class="top-0 inset-x-0 fixed bg-gray-50 h-14 z-30 transition-position w-screen lg:w-auto dark:bg-slate-800">
    <div
      class="flex lg:items-stretch"
      :class="containerMax">
      <div class="flex flex-1 items-stretch h-14">
        <slot />
      </div>
      <div class="flex-none items-stretch flex h-14 lg:hidden">
        <nav-bar-item-plain
          @click.prevent="isMenuNavBarActive = !isMenuNavBarActive">
          <base-icon
            :path="isMenuNavBarActive ? mdiClose : mdiDotsVertical"
            size="24" />
        </nav-bar-item-plain>
      </div>
      <div
        class="max-h-screen-menu overflow-y-auto lg:overflow-visible absolute w-screen top-14 left-0 bg-gray-50 shadow-lg lg:w-auto lg:flex lg:static lg:shadow-none dark:bg-slate-800"
        :class="[isMenuNavBarActive ? 'block' : 'hidden']">
        <nav-bar-item
          v-for="(item, index) in menu"
          :key="index"
          :item="item" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import { ref } from 'vue';
  import { mdiClose, mdiDotsVertical } from '@mdi/js';
  import { containerMax } from '@/shared/constant';
  import BaseIcon from '@/components/BaseIcon.vue';
  import NavBarItemPlain from '@/components/NavBarItemPlain.vue';
  import NavBarItem from '@/components/NavBarItem.vue';
  import type { MenuItem } from '@/shared/type';

  type Props = {
    menu: MenuItem[];
  };

  defineProps<Props>();

  const isMenuNavBarActive = ref(false);
</script>
