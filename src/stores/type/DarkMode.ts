import type { ComputedRef } from 'vue-demi';

/**
 * The result of useDarkModeStore().
 */
export type DarkModeAccessiblePinia = {
  isEnabled: ComputedRef<boolean>;
  set: (payload?: boolean) => void;
  checkMode: () => void;
};
