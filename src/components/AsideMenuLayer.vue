<template>
  <aside
    id="aside"
    class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden">
    <div
      class="aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900">
      <div
        class="aside-brand flex flex-row h-14 items-center justify-between dark:bg-slate-900">
        <div
          class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
          <b class="text-red-500">MOTUS</b>
        </div>
        <button
          class="hidden lg:inline-block xl:hidden p-3"
          @click.prevent="asideLgCloseClick">
          <base-icon :path="mdiClose" />
        </button>
      </div>
      <div
        class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]">
        <ul>
          <aside-menu-item
            v-for="(item, index) in menu"
            :key="index"
            :item="item" />
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { mdiClose } from '@mdi/js';
  import { defineProps, defineEmits } from 'vue';
  import AsideMenuItem from '@/components/AsideMenuItem.vue';
  import BaseIcon from '@/components/BaseIcon.vue';
  import type { MenuItem } from '@/shared/type';

  type Props = {
    menu: MenuItem[];
  };

  defineProps<Props>();

  const emit = defineEmits<{
    (e: 'aside-lg-close-click', event: Event): void;
  }>();

  const asideLgCloseClick = (event: Event) => {
    emit('aside-lg-close-click', event);
  };
</script>
