import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { WordAccessiblePinia, WordState } from '@/stores/type/Word';
import axiosInstance from '@/modules/axios';
import { ForString } from '@/modules/processing';

const internalState = defineStore('word-internal-state', {
  state: () =>
    ({
      dictionary: null,
    }) as WordState,
});

export const useWordStore = defineStore('word-store', () => {
  const state = internalState();

  function _arrayTransform(stringifyArr: string): string[] {
    return stringifyArr.split('\n').map((word: string) => word.trim());
  }

  function fetchDictionary(): Promise<void> {
    return axiosInstance
      .get(import.meta.env.VITE_WORDS_URL)
      .then(response => {
        state.dictionary = _arrayTransform(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch dictionary', error);
        return _loadDefaultDictionary();
      });
  }

  function hasWordInDictionary(word: string): boolean {
    if (!state.dictionary) {
      return false;
    }

    const cleanWords = state.dictionary.map(dic =>
      ForString.removeSpecialCharacter(dic),
    );

    return cleanWords.includes(ForString.removeSpecialCharacter(word));
  }

  function _loadDefaultDictionary(): Promise<void> {
    return fetch('/dico-fr.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load dictionary file');
        }
        return response.text();
      })
      .then(text => {
        state.dictionary = _arrayTransform(text);
      })
      .catch(error => {
        console.error('Error loading dictionary an local:', error);
        return Promise.reject();
      });
  }

  function reset(): void {
    state.$reset();
  }

  return {
    dictionary: computed(() => state.$state.dictionary),
    fetchDictionary,
    hasWordInDictionary,
    reset,
    _test: process.env.NODE_ENV === 'test' ? state : ({} as WordState),
  } as WordAccessiblePinia & { _test: WordState };
});
