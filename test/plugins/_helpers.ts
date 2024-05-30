import type { TestHelpersT } from 'app/test/plugins/_types';

import { StoryBuilder } from 'app/test/plugins/_storyBuilder';

export const TestHelpers: TestHelpersT = {
  storyBuilder: (): StoryBuilder => new StoryBuilder(),
};
