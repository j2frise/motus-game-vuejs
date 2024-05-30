import ResultViewPage from '@/pages/game/outro/ResultViewPage.vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import routeNames from '@/router/routerNames';
import { router } from 'app/test/vitest/setup-file';
import { TestHelpers } from 'app/test/plugins/_helpers';
import { useGameStore } from '@/stores/gameStore';

const mockRouter = {
  push: vi.fn(),
};

vi.mock('vue-router', async importOriginal => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useRouter: () => mockRouter,
  };
});

describe('ResultViewPage', () => {
  let wrapper: VueWrapper;
  const fakeData = TestHelpers.storyBuilder();

  beforeEach(() => {
    fakeData.build();
  });

  afterEach(() => {
    wrapper?.unmount();
    vi.clearAllMocks();
  });

  it('displays congratulations message when player wins', async () => {
    // Arrange
    fakeData.hasWonGame();

    wrapper = mount(ResultViewPage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    await flushPromises();
    const textDisplay = wrapper.text().toLowerCase();

    // Assert
    expect(textDisplay).toContain('félicitation');
    expect(textDisplay).toContain('vous-avez gagnez');
    //Check if the number of attempts is displayed correctly
    expect(textDisplay).toContain(useGameStore()._test.attempts.length);
    //Check if the word is displayed correctly
    expect(textDisplay).toContain(useGameStore()._test.word);
    //Check if the difficulty level is displayed correctly
    expect(textDisplay).toContain(useGameStore().difficultyGame);
  });

  it('displays defeat message when player loses', async () => {
    // Arrange
    fakeData.hasLostGame();

    wrapper = mount(ResultViewPage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    await flushPromises();
    const textDisplay = wrapper.text().toLowerCase();

    // Assert
    expect(textDisplay).toContain('désolé');
    expect(textDisplay).toContain('vous-avez perdu');
    //Check if the number of attempts is displayed correctly
    expect(textDisplay).toContain(useGameStore()._test.attempts.length);
    //Check if the word is displayed correctly
    expect(textDisplay).toContain(useGameStore()._test.word);
    //Check if the difficulty level is displayed correctly
    expect(textDisplay).toContain(useGameStore().difficultyGame);
  });

  it('redirects to the game page if a game is already in progress', async () => {
    //Arrange
    wrapper = mount(ResultViewPage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    await flushPromises();

    //Assert
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: routeNames.ERROR404.name,
    });
  });
});
