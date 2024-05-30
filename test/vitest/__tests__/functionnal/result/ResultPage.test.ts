import { beforeEach, describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { TestHelpers } from 'app/test/plugins/_helpers';
import ResultPage from '@/pages/result/ResultPage.vue';
import { router } from 'app/test/vitest/setup-file';
import { LEVEL } from '@/shared/enum';

describe('ResultPage', () => {
  const fakeData = TestHelpers.storyBuilder();
  const resultGamesSelector = '[data-testid="motus_resultpage_result-games"]';
  const notResultGameSelector =
    '[data-testid="motus_resultpage_empty-result-games"]';
  const paginationBtnSelectors =
    '[data-testid^="motus_resultpage_pagination-btn-"]';

  beforeEach(() => {
    fakeData.build();
  });

  it('renders when no games are available', async () => {
    // Arrange
    const wrapper = mount(ResultPage, {
      global: {
        plugins: [router],
      },
    });

    //Act

    await flushPromises();
    const resultGames = wrapper.find(resultGamesSelector);
    const notResultGame = wrapper.find(notResultGameSelector);

    //Act
    expect(resultGames.exists()).toBeFalsy();
    expect(notResultGame.exists()).toBeTruthy();
  });

  it('renders completed games with player name, number of attempts, result, and created date', async () => {
    //Arrange
    fakeData.withCompletedGames(true);

    const wrapper = mount(ResultPage, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();

    //Act
    const resultGames = wrapper.find(resultGamesSelector);
    const notResultGame = wrapper.find(notResultGameSelector);

    const completedGames = resultGames?.findAll('tbody tr');
    const firtRow = completedGames[0]?.text();
    const secondRow = completedGames[1]?.text();

    //Assert
    expect(resultGames.exists()).toBeTruthy;
    expect(notResultGame.exists()).toBeFalsy();

    expect(completedGames.length).toBe(2);

    expect(firtRow?.toLowerCase()).toContain('camille');
    expect(firtRow?.toLowerCase()).toContain('7');
    expect(firtRow?.toLowerCase()).toContain('perdu');
    expect(firtRow?.toLowerCase()).toContain('2022/01/02');

    expect(secondRow?.toLowerCase()).toContain('jarce');
    expect(secondRow?.toLowerCase()).toContain('5');
    expect(secondRow?.toLowerCase()).toContain('gagné');
    expect(secondRow?.toLowerCase()).toContain('2022/01/01');
  });

  it('renders pagination buttons and navigates to different pages', async () => {
    //Arrange
    fakeData.withCompletedGames(
      Array.from({ length: 25 }, (_, index) => ({
        player: `Player ${index + 1}`,
        attempts: index + 1,
        gameOver: index % 2 === 0,
        createdAt: `2022-01-${index + 1}`,
        point: 0,
        timeElapsed: 0,
        word: `Word ${index + 1}`,
        difficulty: LEVEL.medium,
      })),
    );

    const wrapper = mount(ResultPage, {
      global: {
        plugins: [router],
      },
    });

    //Act
    await flushPromises();

    // Check if the pagination buttons are rendered correctly
    const paginationButtons = wrapper.findAll(paginationBtnSelectors);
    expect(paginationButtons.length).toBe(3); // 25 games should be divided into 3 pages

    // Click on the second pagination button
    await paginationButtons?.[1]?.trigger('click');

    const currentPage = wrapper.find(
      `${paginationBtnSelectors}[aria-active="true"]`,
    );

    //Assert
    expect(currentPage.text()).toContain('2'); // Current page should be 2
  });
});
