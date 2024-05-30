import type { ComputedRef } from 'vue-demi';

/**
 * The result of useWordStore().
 */
export interface WordState {
  dictionary: string[] | null;
}

export type WordAccessiblePinia = {
  dictionary: ComputedRef<string[] | null>;
  fetchDictionary: () => Promise<void>;
  hasWordInDictionary: (word: string) => boolean;
  reset: () => void;
};
