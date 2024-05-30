import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { DarkModeAccessiblePinia } from '@/stores/type/DarkMode';

export const useDarkModeStore = defineStore('darkMode', () => {
  const isEnabled = ref(false);

  function set(payload?: boolean): void {
    isEnabled.value = payload !== undefined ? payload : !isEnabled.value;

    if (typeof document !== 'undefined') {
      document.body.classList[isEnabled.value ? 'add' : 'remove'](
        'dark-scrollbars',
      );

      document.documentElement.classList[isEnabled.value ? 'add' : 'remove'](
        'dark',
        'dark-scrollbars-compat',
      );
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', isEnabled.value ? '1' : '0');
    }
  }

  function checkMode(): void {
    if (
      (!localStorage['darkMode'] &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) ||
      localStorage['darkMode'] === '1'
    ) {
      set(true);
    }
  }

  return {
    isEnabled: computed(() => isEnabled.value),
    set,
    checkMode,
  } as DarkModeAccessiblePinia;
});
