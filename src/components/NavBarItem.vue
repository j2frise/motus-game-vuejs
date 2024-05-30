<template>
  <base-divider
    v-if="item.isDivider"
    nav-bar />
  <component
    :is="is"
    ref="root"
    class="block lg:flex items-center relative cursor-pointer"
    :class="componentClass"
    :to="item.to ?? null"
    :href="item.href ?? null"
    :target="item.target ?? null"
    @click="item.onClick">
    <div class="flex items-center">
      <base-icon
        v-if="item.icon"
        :path="item.icon"
        class="transition-colors" />
      <span
        class="px-2 transition-colors"
        :class="{ 'lg:hidden': item.isDesktopNoLabel && item.icon }"
        >{{ itemLabel }}</span
      >
    </div>
  </component>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { defineProps, ref, computed } from 'vue';
  import BaseIcon from '@/components/BaseIcon.vue';
  import BaseDivider from '@/components/BaseDivider.vue';
  import type { MenuItem } from '@/shared/type';

  type Props = {
    item: MenuItem;
  };

  const props = defineProps<Props>();

  const is = computed(() => {
    if (props.item.href) {
      return 'a';
    }

    if (props.item.to) {
      return RouterLink;
    }

    return 'div';
  });

  const componentClass = computed(() => {
    const base: string[] = [
      'navbar-item-label dark:text-white dark:hover:text-slate-400',
      'py-2 px-3',
    ];

    if (props.item.isDesktopNoLabel) {
      base.push('lg:w-16', 'lg:justify-center');
    }

    return base;
  });

  const itemLabel = computed(() => props.item.label);

  const root = ref<HTMLElement | null>(null);
</script>
