<template>
  <component
    :is="isForm ? 'form' : 'div'"
    :class="componentClass"
    class="bg-white flex"
    @submit="submit">
    <slot v-if="hasComponentLayout" />
    <template v-else>
      <card-box-component-body :no-padding="hasTable">
        <slot />
      </card-box-component-body>
      <footer
        v-if="hasFooterSlot"
        class="p-6">
        <slot name="footer" />
      </footer>
    </template>
  </component>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits, computed, useSlots } from 'vue';
  import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue';

  interface Props {
    rounded?: string;
    flex?: string;
    hasComponentLayout?: boolean;
    hasTable?: boolean;
    isForm?: boolean;
    isHoverable?: boolean;
    isModal?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    rounded: 'rounded-2xl',
    flex: 'flex-col',
    hasComponentLayout: undefined,
    hasTable: undefined,
    isForm: undefined,
    isHoverable: undefined,
    isModal: undefined,
  });

  const emit = defineEmits(['submit']);

  const slots = useSlots();

  const hasFooterSlot = computed(() => slots.footer && !!slots.footer());

  const componentClass = computed(() => {
    const base = [
      props.rounded,
      props.flex,
      props.isModal ? 'dark:bg-slate-900' : 'dark:bg-slate-900/70',
    ];

    if (props.isHoverable) {
      base.push('hover:shadow-lg transition-shadow duration-500');
    }

    return base;
  });

  const submit = (event: Event) => {
    emit('submit', event);
  };
</script>
