import { defineStore } from 'pinia';
import type {
  CompletedGame,
  CreatePLayer,
  CurrentGame,
  GameAccessiblePinia,
  GameState,
  LetterGame,
  Grid,
} from '@/stores/type/Game';
import { computed, ref } from 'vue';
import { LEVEL } from '@/shared/enum';
import { Store } from '@/modules/Storage';
import { useWordStore } from './wordStore';
import { ForString } from '@/modules/processing';

const currentGameStorageName = 'currentGame';
const completedGamesStorageName = 'completedGames';

// Retrieve data for current and completed games from storage
const currentGameStorage = JSON.parse(
  Store.get(currentGameStorageName) || 'null',
) as CurrentGame | null;
const completedGamesStorage = JSON.parse(
  Store.get(completedGamesStorageName) || '[]',
) as CompletedGame[];

// Define default values
const defaultPlayer = currentGameStorage?.player ?? '';
const defaultDifficulty = currentGameStorage?.difficulty ?? LEVEL.easy;
const defaultWord = currentGameStorage?.word ?? '';
const defaultAttempts = currentGameStorage?.attempts ?? [];
const defaultTimeElapsed = currentGameStorage?.timeElapsed ?? 0;
const defaultPoint = currentGameStorage?.point ?? 0;
const defaultGrid = currentGameStorage?.grid ?? [];
const defaultGameOver = currentGameStorage?.gameOver ?? false;
const defaultDate = currentGameStorage?.createdAt ?? '';

// Define the internal game state
const internalState = defineStore('game-internal-state', {
  state: () =>
    ({
      player: defaultPlayer,
      difficulty: defaultDifficulty,
      word: defaultWord,
      attempts: defaultAttempts,
      timeElapsed: defaultTimeElapsed,
      point: defaultPoint,
      grid: defaultGrid,
      gameOver: defaultGameOver,
      completedGames: completedGamesStorage,
      createdAt: defaultDate,
    }) as GameState,
});

export const useGameStore = defineStore('game-store', () => {
  const state = internalState();
  const wordStore = useWordStore();

  const defaultGridCell: LetterGame = {
    letter: '',
    present: null,
    wellPlaced: null,
  };

  const currentGameStorageRef = ref<CurrentGame | null>(
    JSON.parse(Store.get(currentGameStorageName) || 'null'),
  );

  const emptyGridCells = ref<Grid | null>(
    currentGameStorageRef.value?.emptyGridCells ?? null,
  );

  const difficultyGame = computed(() => {
    switch (state.difficulty) {
      case LEVEL.hard:
        return 8;
      case LEVEL.medium:
        return 7;
      default:
        return 6;
    }
  });
  const dicoWords = computed(() =>
    (wordStore.dictionary ?? []).filter(
      word => word.length === difficultyGame.value,
    ),
  );
  const isReady = computed(
    () => !!state.player && !!dicoWords.value && dicoWords.value.length > 0,
  );
  const attemptNb = computed(() => 7);
  const remainingAttempt = computed(
    () => attemptNb.value - state.attempts.length,
  );
  const isInProgress = computed(() => !!currentGameStorageRef.value);
  const cleanWord = computed(() =>
    ForString.removeSpecialCharacter(state.word),
  );

  function _getFormatDateNow(): string {
    const date = new Date();
    return date
      .toISOString()
      .replace('T', ' ')
      .substring(0, 16)
      .replace(/-/g, '/');
  }

  function _getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * dicoWords.value.length);
    return (dicoWords.value[randomIndex] || dicoWords.value[0]) as string;
  }

  function _saveCurrentGame(): void {
    const currentGame = {
      ...state.$state,
      emptyGridCells: emptyGridCells.value,
    };
    delete currentGame.completedGames;

    currentGameStorageRef.value = currentGame;
    Store.set(currentGameStorageName, JSON.stringify(currentGame));
  }

  function startNewGame(): void {
    state.gameOver = false;
    state.attempts = [];
    state.timeElapsed = 0;
    state.point = 0;
    state.createdAt = _getFormatDateNow();
    state.word = _getRandomWord();

    state.grid = Array.from({ length: 1 }, () => ({
      isEmpty: false,
      isCurrent: true,
      cells: Array.from({ length: difficultyGame.value }, (_v, i) => ({
        letter: i === 0 ? cleanWord.value.charAt(0) : '',
        present: null,
        wellPlaced: null,
      })),
    }));

    emptyGridCells.value = {
      isEmpty: true,
      isCurrent: false,
      cells: Array.from(
        { length: difficultyGame.value },
        () => defaultGridCell,
      ),
    };

    _saveCurrentGame();
  }

  function addAttempt(attempt: string): void | true {
    state.attempts.push(attempt);
    attempt = ForString.removeSpecialCharacter(attempt);

    const gridIndex = state.attempts.length - 1;
    const gridCells = state.grid[gridIndex];

    if (attempt === cleanWord.value) {
      if (gridCells) {
        gridCells.isEmpty = false;
        gridCells.isCurrent = true;
        gridCells.cells.forEach((cell, pos) => {
          const char = attempt[pos] ?? '';
          cell.letter = char;
          cell.present = true;
          cell.wellPlaced = true;
        });
      }
      _completeGame(true);
      return true;
    }

    if (remainingAttempt.value === 0) {
      _completeGame(false);
      return;
    }

    const newCells: LetterGame[] = [];

    if (gridCells) {
      gridCells.isEmpty = false;
      gridCells.isCurrent = false;
      gridCells.cells.forEach((cell, pos) => {
        const char = attempt[pos] ?? '';
        cell.letter = char;
        cell.present = ForString.isCharIncluded(cleanWord.value, char);
        cell.wellPlaced = cell.present && cleanWord.value[pos] === char;
      });

      newCells.push(
        ...gridCells.cells.map(cell => {
          return {
            present: null,
            letter: cell.wellPlaced ? cell.letter : '',
            wellPlaced: null,
          };
        }),
      );
    }

    state.grid.push({
      isEmpty: false,
      isCurrent: true,
      cells: newCells,
    });

    _saveCurrentGame();
  }

  function forfeit(): void {
    _completeGame(false);
  }

  function _completeGame(success: boolean): void {
    state.gameOver = !success;

    state.completedGames.push({
      word: state.word,
      point: state.point,
      gameOver: state.gameOver,
      attempts: state.attempts.length,
      timeElapsed: state.timeElapsed,
      createdAt: state.createdAt,
      player: state.player,
      difficulty: state.difficulty,
    });

    Store.set(completedGamesStorageName, JSON.stringify(state.completedGames));

    //reset
    Store.destroy(currentGameStorageName);
    currentGameStorageRef.value = null;
    state.timeElapsed = 0;
  }

  function sortCompletedGamesByDate(
    completedGames: CompletedGame[],
  ): CompletedGame[] {
    return completedGames.sort((a, b) => {
      const dateA = new Date(a.createdAt?.replace(/\//g, '-') ?? 0).getTime();
      const dateB = new Date(b.createdAt?.replace(/\//g, '-') ?? 0).getTime();
      return dateB - dateA; // Sort in descending order
    });
  }

  function createPlayer(payload: CreatePLayer): Promise<void> {
    return Promise.resolve()
      .then(reset)
      .then(() => {
        state.player = payload.player;
        state.difficulty = payload.difficulty;
      });
  }

  function reset(): void {
    state.$reset();
    Store.destroy(currentGameStorageName);
  }

  return {
    state: computed(() => state.$state),
    isReady,
    remainingAttempt,
    attemptNb,
    reset,
    startNewGame,
    difficultyGame,
    addAttempt,
    createPlayer,
    isInProgress,
    forfeit,
    sortCompletedGamesByDate,
    emptyGridCells: computed(() => emptyGridCells.value),
    _test: process.env.NODE_ENV === 'test' ? state : ({} as GameState),
  } as GameAccessiblePinia & { _test: GameState };
});
