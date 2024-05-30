<template>
  <div class="relative">
    <select
      v-if="computedType === 'select'"
      :id="id"
      ref="selectEl"
      v-model="model"
      :name="name"
      :class="inputElClass">
      <option
        v-for="option in options"
        :key="option.id ?? option"
        :value="option">
        {{ option.label ?? option }}
      </option>
    </select>
    <textarea
      v-else-if="computedType === 'textarea'"
      :id="id"
      ref="textareaEl"
      v-model="model"
      :class="inputElClass"
      :name="name"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :required="required" />

    <input
      v-else
      :id="id"
      ref="inputEl"
      v-model="model"
      :name="name"
      :maxlength="maxlength"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      :required="required"
      :placeholder="placeholder"
      :type="computedType"
      :class="inputElClass" />
    <base-icon
      v-if="icon"
      :path="icon"
      w="w-10"
      :h="controlIconH"
      class="absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import BaseIcon from '@/components/BaseIcon.vue';

  type ModelValue =
    | string
    | number
    | boolean
    | Array<any>
    | Record<string, any>
    | readonly string[]
    | null
    | undefined;

  type Props = {
    name?: string;
    id?: string;
    autocomplete?: string;
    maxlength?: string;
    placeholder?: string;
    inputmode?:
      | 'search'
      | 'text'
      | 'none'
      | 'tel'
      | 'url'
      | 'email'
      | 'numeric'
      | 'decimal';
    icon?: string | null;
    options?: Array<any> | null;
    type?: string;
    required?: boolean;
    borderless?: boolean;
    transparent?: boolean;
  };

  const props = defineProps<Props>();
  const emit = defineEmits(['setRef']);
  const model = defineModel<ModelValue>();

  const computedType = computed(() =>
    props.options ? 'select' : props.type ?? 'text',
  );

  const inputElClass = computed(() => {
    const base = [
      'px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full',
      'dark:placeholder-gray-400',
      computedType.value === 'textarea' ? 'h-24' : 'h-12',
      props.borderless ? 'border-0' : 'border',
      props.transparent ? 'bg-transparent' : 'bg-white dark:bg-slate-800',
    ];

    if (props.icon) {
      base.push('pl-10');
    }

    return base;
  });

  const controlIconH = computed(() =>
    props.type === 'textarea' ? 'h-full' : 'h-12',
  );

  const selectEl = ref<HTMLSelectElement | null>(null);
  const textareaEl = ref<HTMLTextAreaElement | null>(null);
  const inputEl = ref<HTMLInputElement | null>(null);

  onMounted(() => {
    if (selectEl.value) {
      emit('setRef', selectEl.value);
    } else if (textareaEl.value) {
      emit('setRef', textareaEl.value);
    } else {
      emit('setRef', inputEl.value);
    }
  });
</script>
