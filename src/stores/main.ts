import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { MainAccessiblePinia } from '@/stores/type/Main';

export const useMainStore = defineStore('main-store', () => {
  const isAsideMobileExpanded = ref(false);
  const isAsideLgActive = ref(false);

  return {
    isAsideMobileExpanded,
    isAsideLgActive,
  } as MainAccessiblePinia;
});
