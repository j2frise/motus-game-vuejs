import { LEVEL } from '@/shared/enum';

const fakeUsers = {
  jarce: {
    player: 'Jarce',
    difficulty: LEVEL.medium,
  },
  camille: {
    player: 'Camille',
    difficulty: LEVEL.easy,
  },
};

const fakeResponses = {
  words: ['pommes', 'élu', 'bananes', 'bologne', 'bontés', 'orange'],
};

export default {
  fakeUsers,
  fakeResponses,
};
