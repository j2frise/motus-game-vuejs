import type { StoryBuilderT } from 'app/test/plugins/_types';

import { useGameStore } from '@/stores/gameStore';
import { useWordStore } from '@/stores/wordStore';
import { CompletedGame, CreatePLayer } from '@/stores/type/Game';
import { fixtures, fakeResponses } from 'app/test/vitest/setup-file';

export class StoryBuilder implements StoryBuilderT {
  constructor() {}

  build(): StoryBuilder {
    useGameStore().reset();
    useWordStore().reset();

    useWordStore()._test.dictionary = fakeResponses.words;

    return this;
  }

  /**
   * @inheritdoc
   */
  withExistingPlayer(payload: true | CreatePLayer): void {
    if (payload === true) {
      useGameStore()._test.player = fixtures.jarce.player;
      useGameStore()._test.difficulty = fixtures.jarce.difficulty;
      return;
    }

    useGameStore().createPlayer(payload);
  }

  /**
   * @inheritdoc
   */
  withCompletedGames(games: true | CompletedGame[]): void {
    if (games === true) {
      useGameStore()._test.completedGames = [
        {
          player: fixtures.jarce.player,
          difficulty: fixtures.jarce.difficulty,
          attempts: 5,
          gameOver: false,
          createdAt: '2022/01/01 00:00',
          word: fakeResponses.words[2] ?? '',
          timeElapsed: 0,
          point: 0,
        },
        {
          player: fixtures.camille.player,
          difficulty: fixtures.camille.difficulty,
          attempts: 7,
          gameOver: true,
          createdAt: '2022/01/02 00:00',
          word: fakeResponses.words[0] ?? '',
          timeElapsed: 0,
          point: 0,
        },
      ];
      return;
    }

    useGameStore()._test.completedGames = games;
  }

  /**
   * @inheritdoc
   */
  withoutWordsDico(): void {
    useWordStore()._test.dictionary = null;
  }

  /**
   * @inheritdoc
   */
  withNewGame(): void {
    //
  }

  /**
   * @inheritdoc
   */
  withGameInProgress(): void {
    this.withExistingPlayer(true);
    useGameStore().startNewGame();
    useGameStore()._test.word =
      fakeResponses.words[2] ?? useGameStore()._test.word;
    useGameStore()._test.createdAt = '2022/01/02 12:00';
  }

  /**
   * @inheritdoc
   */
  hasWonGame(): void {
    this.withGameInProgress();
    useGameStore()._test.gameOver = false;
    useGameStore()._test.attempts = [useGameStore()._test.word];
    useGameStore()._test.timeElapsed = 0;
  }

  /**
   * @inheritdoc
   */
  hasLostGame(): void {
    this.withGameInProgress();
    useGameStore()._test.gameOver = true;
    useGameStore()._test.attempts = Array.from(
      { length: 1 },
      (_, i) => `attemps_${i}`,
    );
    useGameStore()._test.timeElapsed = 0;
  }
}
