<template>
  <li>
    <component
      :is="item.to ? RouterLink : 'a'"
      v-slot="vSlot"
      :to="item.to ?? null"
      :href="item.href ?? null"
      :target="item.target ?? null"
      class="flex cursor-pointer"
      :class="componentClass"
      @click="item.onClick">
      <base-icon
        v-if="item.icon"
        :path="item.icon"
        class="flex-none"
        :class="[vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '']"
        w="w-16"
        :size="18" />
      <span
        class="grow text-ellipsis line-clamp-1 pr-12"
        :class="[vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '']"
        >{{ item.label }}</span
      >
    </component>
  </li>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { RouterLink } from 'vue-router';
  import { getButtonColor } from '@/shared/colors';
  import BaseIcon from '@/components/BaseIcon.vue';
  import type { MenuItem } from '@/shared/type';

  type Props = {
    item: MenuItem;
  };

  const props = defineProps<Props>();

  const hasColor = computed(() => props.item && props.item.color);

  const asideMenuItemActiveStyle = computed(() =>
    hasColor.value ? '' : 'aside-menu-item-active font-bold',
  );

  const componentClass = computed(() => [
    'py-3',
    hasColor.value
      ? getButtonColor(props.item.color, false, true)
      : 'aside-menu-item dark:text-slate-300 dark:hover:text-white',
  ]);
</script>
