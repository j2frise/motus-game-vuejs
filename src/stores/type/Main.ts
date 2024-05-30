import type { Ref } from 'vue-demi';

/**
 * The result of useMainStore().
 */
export type MainAccessiblePinia = {
  isAsideMobileExpanded: Ref<boolean>;
  isAsideLgActive: Ref<boolean>;
};
