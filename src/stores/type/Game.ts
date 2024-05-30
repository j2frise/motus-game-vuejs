import { LEVEL } from '@/shared/enum';
import type { ComputedRef } from 'vue-demi';

export interface CreatePLayer {
  player: string;
  difficulty: LEVEL;
}

export interface LetterGame {
  letter: string;
  present: boolean | null;
  wellPlaced: boolean | null;
}

export interface Grid {
  isEmpty: boolean;
  isCurrent: boolean;
  cells: LetterGame[];
}

export interface GameType {
  player: string;
  difficulty: LEVEL;
  word: string;
  timeElapsed: number;
  attempts: string[];
  point: number;
  grid: Grid[];
  gameOver: boolean;
  createdAt: string;
}

export type CurrentGame = GameType & { emptyGridCells: Grid | null };

export interface CompletedGame extends Omit<GameType, 'attempts' | 'grid'> {
  attempts: number;
}

export interface GameState extends GameType {
  completedGames: CompletedGame[];
}

/**
 * The result of useGameStore().
 */
export type GameAccessiblePinia = {
  state: ComputedRef<GameState>;
  isReady: ComputedRef<boolean>;
  remainingAttempt: ComputedRef<number>;
  attemptNb: ComputedRef<number>;
  isInProgress: ComputedRef<boolean>;
  difficultyGame: ComputedRef<number>;
  emptyGridCells: ComputedRef<Grid | null>;
  addAttempt: (attempt: string) => void | true;
  startNewGame: () => void;
  createPlayer: (payload: CreatePLayer) => Promise<void>;
  reset: () => void;
  forfeit: () => void;
  sortCompletedGamesByDate: (
    completedGames: CompletedGame[],
  ) => CompletedGame[];
};
