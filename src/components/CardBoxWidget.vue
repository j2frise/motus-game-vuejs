<template>
  <CardBox>
    <base-level
      v-if="hasTagSlot"
      class="mb-3"
      mobile>
      <slot name="tag" />
    </base-level>
    <base-level mobile>
      <div>
        <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">
          {{ label }}
        </h3>
        <h1 class="text-3xl leading-tight font-semibold">
          {{ prefix }}{{ number }}{{ suffix }}
        </h1>
      </div>
      <base-icon
        v-if="icon"
        :path="icon"
        size="48"
        w=""
        h="h-16"
        :class="color" />
    </base-level>
  </CardBox>
</template>

<script setup lang="ts">
  import CardBox from '@/components/CardBox.vue';
  import BaseIcon from '@/components/BaseIcon.vue';
  import BaseLevel from '@/components/BaseLevel.vue';
  import { computed, useSlots } from 'vue';

  type Props = {
    number?: number;
    icon?: string | null;
    prefix?: string | null;
    suffix?: string | null;
    label?: string | null;
    color?: string | null;
  };

  defineProps<Props>();

  const slots = useSlots();
  const hasTagSlot = computed(() => !!slots.tag);
</script>
