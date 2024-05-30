import HomeResumePage from '@/pages/home/HomeResumePage.vue';
import { beforeEach, describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { router } from 'app/test/vitest/setup-file';
import { TestHelpers } from 'app/test/plugins/_helpers';

describe('YourComponent', () => {
  const fakeData = TestHelpers.storyBuilder();
  const newGameBtnSelector = '[data-testid="motus_homepage_new-game-btn"]';

  beforeEach(() => {
    fakeData.build();
  });

  it('disables "Nouvelle partie" button when dictionary is not ready', async () => {
    //Arrange
    fakeData.withoutWordsDico();

    const wrapper = mount(HomeResumePage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    const newGameBtn = await wrapper.find(newGameBtnSelector);
    await flushPromises();

    //Assert
    expect(newGameBtn.attributes('disabled')).toBe('true');
  });

  it('enables "Nouvelle partie" button when dictionary is ready', async () => {
    //Arrange
    const wrapper = mount(HomeResumePage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    const newGameBtn = await wrapper.find(newGameBtnSelector);
    await flushPromises();

    //Assert
    expect(newGameBtn.attributes('disabled')).toBe('false');
  });
});
