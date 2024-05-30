import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import GameViewPage from '@/pages/game/during/GameViewPage.vue';
import { useGameStore } from '@/stores/gameStore';
import routeNames from '@/router/routerNames';
import { router } from 'app/test/vitest/setup-file';
import { TestHelpers } from 'app/test/plugins/_helpers';

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

describe('GameViewPage', () => {
  let wrapper: VueWrapper;
  const fakeData = TestHelpers.storyBuilder();
  const notificationSelector =
    '[data-testid="motus_homepage_not-found-notification"]';
  const cellsSelector = '[data-testid^="motus_homepage_cell-display-status-"]';

  beforeEach(() => {
    fakeData.build();
    vi.useFakeTimers();
  });

  afterEach(() => {
    wrapper?.unmount();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("redirects to the user's creation page if no game is currently running", async () => {
    //Arrange
    wrapper = mount(GameViewPage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    await flushPromises();

    //Assert
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: routeNames.REGISTER.name,
    });
  });

  it("when the user types a word that doesn't exist in the dictionary", async () => {
    //Arrange
    fakeData.withGameInProgress();
    wrapper = mount(GameViewPage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    expect(wrapper.find(notificationSelector).exists()).toBeFalsy();

    await playToLose(1, useGameStore().difficultyGame - 1);

    const cells = wrapper.find('tr').findAll(cellsSelector);

    await flushPromises();

    //Assert
    expect(useGameStore()._test.attempts.length).toEqual(0);
    expect(wrapper.vm.isWin).toBe(false);
    expect(wrapper.find(notificationSelector).exists()).toBeTruthy();

    cells.forEach(element => {
      expect(element.classes()).not.toContain('bg-red-500');
      expect(element.classes()).not.toContain('bg-yellow-500');
      expect(element.classes()).not.toContain('rounded-full');
    });
  });

  it('when the user has lost after 7 attempts and redirects to the result page', async () => {
    //Arrange
    fakeData.withGameInProgress();
    wrapper = mount(GameViewPage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    await playToLose(useGameStore().attemptNb, undefined, 'ologne');

    const cells = wrapper.find('tr').findAll(cellsSelector);

    await flushPromises();
    // Fast-forward time
    vi.runAllTimers();

    //Assert
    expect(useGameStore()._test.attempts.length).toEqual(7);

    expect(cells[0]?.classes()).toContain('bg-red-500');
    expect(cells[0]?.classes()).not.toContain('bg-yellow-500');
    expect(cells[0]?.classes()).not.toContain('rounded-full');
    expect(cells[5]?.classes()).toContain('bg-yellow-500');
    expect(cells[5]?.classes()).toContain('rounded-full');
    expect(cells[5]?.classes()).not.toContain('rbg-red-500');
    expect(cells[6]?.classes()).toContain('bg-yellow-500');
    expect(cells[6]?.classes()).toContain('rounded-full');
    expect(cells[6]?.classes()).not.toContain('rbg-red-500');

    expect(cells[1]?.classes()).not.toContain('bg-red-500');
    expect(cells[1]?.classes()).not.toContain('bg-yellow-500');
    expect(cells[1]?.classes()).not.toContain('rounded-full');
    expect(cells[2]?.classes()).not.toContain('bg-red-500');
    expect(cells[2]?.classes()).not.toContain('bg-yellow-500');
    expect(cells[2]?.classes()).not.toContain('rounded-full');
    expect(cells[3]?.classes()).not.toContain('bg-red-500');
    expect(cells[3]?.classes()).not.toContain('bg-yellow-500');
    expect(cells[3]?.classes()).not.toContain('rounded-full');
    expect(cells[4]?.classes()).not.toContain('bg-red-500');
    expect(cells[4]?.classes()).not.toContain('bg-yellow-500');
    expect(cells[4]?.classes()).not.toContain('rounded-full');

    expect(wrapper.vm.isWin).toBe(false);
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: routeNames.RESULT_GAME.name,
    });
  });

  it('when the user has found the word and is redirected to the results page', async () => {
    //Arrange
    fakeData.withGameInProgress();
    wrapper = mount(GameViewPage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    await pressLetterKey(useGameStore()._test.word[1]);
    await pressLetterKey(useGameStore()._test.word[2]);
    await pressLetterKey(useGameStore()._test.word[3]);
    await pressLetterKey(useGameStore()._test.word[4]);
    await pressLetterKey(useGameStore()._test.word[5]);
    await pressLetterKey(useGameStore()._test.word[6]);
    await pressEnter();

    const cells = wrapper.find('tr').findAll(cellsSelector);

    await flushPromises();
    // Fast-forward time
    vi.runAllTimers();

    //Assert
    expect(useGameStore()._test.attempts.length).toEqual(1);
    expect(wrapper.vm.isWin).toBe(true);

    cells.forEach(element => {
      expect(element.classes()).toContain('bg-red-500');
      expect(element.classes()).not.toContain('bg-yellow-500');
      expect(element.classes()).not.toContain('rounded-full');
    });

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: routeNames.RESULT_GAME.name,
    });
  });

  it('handles the give up action correctly', async () => {
    //Arrange
    fakeData.withGameInProgress();
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    wrapper = mount(GameViewPage, {
      global: {
        plugins: [router],
      },
    });

    // Act
    await wrapper
      .find('[data-testid="motus_homepage_give-up-btn"]')
      .trigger('click');

    await flushPromises();

    // Assert
    expect(confirmSpy).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: routeNames.RESULT.name,
    });
  });

  async function pressLetterKey(letter = 'a'): Promise<void> {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: letter }));
  }

  async function pressKeyRepeatedly(param: number | string): Promise<void> {
    if (typeof param === 'number') {
      for (let i = 0; i < param; i++) {
        pressLetterKey();
      }
      return;
    }

    if (typeof param === 'string') {
      for (let i = 0; i < param.length; i++) {
        pressLetterKey(param[i]);
      }
      return;
    }
  }

  async function pressEnter(): Promise<void> {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  }

  async function playToLose(
    nbRepeat: number,
    nbLetter?: number,
    word?: string,
  ): Promise<void> {
    for (let i = 0; i < nbRepeat; i++) {
      pressKeyRepeatedly(word ?? nbLetter ?? 1);
      pressEnter();
    }
  }
});
