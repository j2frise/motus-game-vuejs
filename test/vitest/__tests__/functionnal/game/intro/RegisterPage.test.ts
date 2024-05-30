import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { router } from 'app/test/vitest/setup-file';
import RegisterPage from '@/pages/game/intro/RegisterPage.vue';
import routeNames from '@/router/routerNames';
import { useGameStore } from '@/stores/gameStore';
import { levelOptions } from '@/shared/constant';
import type { VueWrapper } from '@vue/test-utils';
import { TestHelpers } from 'app/test/plugins/_helpers';
import { LEVEL } from '@/shared/enum';

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

describe('RegisterPage', () => {
  let wrapper: VueWrapper;
  const fakeData = TestHelpers.storyBuilder();
  const pseudoInputSelector = '[data-testid="motus_registerpage_pseudo-input"]';
  const beginBtnSelector =
    '[data-testid="motus_registerpage_submit-begin-btn"]';

  beforeEach(() => {
    fakeData.build();
    localStorage.clear();
  });

  afterEach(() => {
    wrapper?.unmount();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes the form with default values: empty player', async () => {
    //Arrange
    wrapper = mount(RegisterPage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    const pseudoInput = await wrapper.find(pseudoInputSelector).find('input');
    const beginBtn = await wrapper.find(beginBtnSelector);

    await beginBtn.trigger('click');
    await flushPromises();

    //Assert
    expect(pseudoInput.element.value).toBe('');
    expect(wrapper.vm.form.level.id).toBe(LEVEL.easy);
    expect(beginBtn.attributes('disabled')).toBe('true');
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('submits the form correctly and redirects to the game page', async () => {
    //Arrange
    const createPlayerSpy = vi.spyOn(useGameStore(), 'createPlayer');
    const startNewGameSpy = vi.spyOn(useGameStore(), 'startNewGame');

    wrapper = mount(RegisterPage, {
      global: {
        plugins: [router],
      },
    });

    const form = wrapper.vm.form;
    form.pseudo = 'ValidPseudo';
    form.level = levelOptions[0];

    const beginBtn = await wrapper.find(beginBtnSelector);
    await beginBtn.trigger('click');

    await flushPromises();

    //Assert
    expect(createPlayerSpy).toHaveBeenCalledWith({
      player: form.pseudo,
      difficulty: form.level.id,
    });
    expect(startNewGameSpy).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: routeNames.PLAY.name,
    });
  });

  it('redirects to the game page if a game is already in progress', async () => {
    //Arrange
    fakeData.withGameInProgress();

    wrapper = mount(RegisterPage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    await flushPromises();

    //Assert
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: routeNames.PLAY.name,
    });
  });
});
