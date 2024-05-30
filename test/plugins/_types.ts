import { CompletedGame, CreatePLayer } from '@/stores/type/Game';

export type TestHelpersT = {
  storyBuilder: () => StoryBuilderT;
};

export type StoryBuilderT = {
  build: () => StoryBuilderT;

  /**
   * @description
   */
  withExistingPlayer: (payload: true | CreatePLayer) => void;

  /**
   * @description
   */
  withCompletedGames: (games: true | CompletedGame[]) => void;

  /**
   * @description
   */
  withNewGame: () => void;

  /**
   * @description
   */
  withoutWordsDico: () => void;

  /**
   * @description
   */
  withGameInProgress: () => void;

  /**
   * @description
   */
  hasWonGame: () => void;

  /**
   * @description
   */
  hasLostGame: () => void;
};
