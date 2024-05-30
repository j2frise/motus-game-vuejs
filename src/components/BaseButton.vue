<template>
  <component
    :is="is"
    :class="componentClass"
    :href="disabled ? undefined : href ?? undefined"
    :type="computedType ?? null"
    :to="disabled ? undefined : to ?? undefined"
    :target="target ?? null"
    :disabled="disabled"
    :aria-active="active ? true : undefined">
    <base-icon
      v-if="icon"
      :path="icon"
      :size="iconSize" />
    <span
      v-if="label"
      :class="labelClass"
      >{{ label }}</span
    >
  </component>
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import { RouterLink } from 'vue-router';
  import { Color, getButtonColor } from '@/shared/colors.js';
  import BaseIcon from '@/components/BaseIcon.vue';

  type Props = {
    label?: string | number | null;
    icon?: string;
    iconSize?: string | number;
    href?: string;
    target?: string;
    to?: string | object;
    type?: string;
    color?: Color;
    as?: string;
    small?: boolean;
    outline?: boolean;
    active?: boolean;
    disabled?: boolean;
    roundedFull?: boolean;
  };

  const props = defineProps<Props>();

  const is = computed(() => {
    if (props.as) {
      return props.as;
    }

    if (props.to) {
      return RouterLink;
    }

    if (props.href) {
      return 'a';
    }

    return 'button';
  });

  const computedType = computed(() => {
    if (is.value === 'button') {
      return props.type ?? 'button';
    }

    return null;
  });

  const labelClass = computed(() =>
    props.small && props.icon ? 'px-1' : 'px-2',
  );

  const componentClass = computed(() => {
    const base = [
      'inline-flex',
      'justify-center',
      'items-center',
      'whitespace-nowrap',
      'focus:outline-none',
      'transition-colors',
      'focus:ring',
      'duration-150',
      'border',
      props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      props.roundedFull ? 'rounded-full' : 'rounded',
      props.color
        ? getButtonColor(
            props.color,
            props.outline ?? false,
            !props.disabled,
            props.active,
          )
        : '',
    ];

    if (!props.label && props.icon) {
      base.push('p-1');
    } else if (props.small) {
      base.push('text-sm', props.roundedFull ? 'px-3 py-1' : 'p-1');
    } else {
      base.push('py-2', props.roundedFull ? 'px-6' : 'px-3');
    }

    if (props.disabled) {
      base.push(props.outline ? 'opacity-50' : 'opacity-70');
    }

    return base;
  });
</script>
