<template>
  <component
    :is="is"
    :class="componentClass"
    :href="href"
    :type="computedType"
    :to="to"
    :target="target"
    :disabled="disabled">
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
    label: string | number | null;
    icon: string | null;
    iconSize: string | number | null;
    href: string | null;
    target: string | null;
    to: string | object | null;
    type: string | null;
    color: Color;
    as: string | null;
    small: boolean;
    outline: boolean;
    active: boolean;
    disabled: boolean;
    roundedFull: boolean;
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
      getButtonColor(props.color, props.outline, !props.disabled, props.active),
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
