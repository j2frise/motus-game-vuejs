<template>
  <div
    v-if="!isDismissed"
    :class="componentClass"
    class="px-2 py-4 md:py-1 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
    <base-level>
      <div class="flex flex-col md:flex-row items-center">
        <base-icon
          v-if="icon"
          :path="icon"
          w="w-10 md:w-5"
          h="h-10 md:h-5"
          size="24"
          class="md:mr-2" />
        <span class="text-center md:text-left md:py-2"><slot /></span>
      </div>
      <slot
        v-if="hasRightSlot"
        name="right" />
      <base-button
        v-else
        :icon="mdiClose"
        small
        rounded-full
        color="white"
        @click="isDismissed = true" />
    </base-level>
  </div>
</template>

<script setup lang="ts">
  import { computed, useSlots, defineProps, defineModel } from 'vue';
  import { mdiClose } from '@mdi/js';
  import { colorsBgLight, colorsOutline } from '@/shared/colors.js';
  import type { Color } from '@/shared/colors.js';
  import BaseLevel from '@/components/BaseLevel.vue';
  import BaseIcon from '@/components/BaseIcon.vue';
  import BaseButton from '@/components/BaseButton.vue';

  type Props = {
    icon?: string;
    outline?: boolean;
    color?: Color;
  };

  const props = defineProps<Props>();
  const isDismissed = defineModel<boolean>('isDismissed', { default: false });

  const componentClass = computed(() => {
    if (!props.color) {
      return null;
    }

    return props.outline
      ? colorsOutline[props.color]
      : colorsBgLight[props.color];
  });

  const slots = useSlots();

  const hasRightSlot = computed(() => !!slots.right);
</script>
