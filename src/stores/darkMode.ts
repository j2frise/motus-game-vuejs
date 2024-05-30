import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { DarkModeAccessiblePinia } from '@/stores/type/DarkMode';
import { Store } from '@/modules/Storage';

export const useDarkModeStore = defineStore('darkMode', () => {
  const isEnabled = ref(false);
  const nameStorage = 'darkMode';

  const darkModeStorage = computed(() => Store.get(nameStorage));

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

    Store.set(nameStorage, isEnabled.value ? '1' : '0');
  }

  function checkMode(): void {
    if (
      (!darkModeStorage.value &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) ||
      darkModeStorage.value === '1'
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
