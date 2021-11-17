import FireUser from './firebase/User';
import FireScore from './firebase/Score';
import FireEventHistory from './firebase/EventHistory';

import OsuRanking from './osu/Ranking';
import OsuUser from './osu/User';
import OsuUserScore from './osu/UserScore';
import OsuRankings from './osu/Rankings';

enum OSU_SCORE_TYPE {
  BEST = 'best',
  FIRSTS = 'firsts',
  RECENT = 'recent'
}

enum OSU_GAME_MODE {
  FRUITS = 'fruits',
  MANIA = 'mania',
  OSU = 'osu',
  TAIKO = 'taiko'
}

export {
  FireUser, FireScore, FireEventHistory,
  OSU_SCORE_TYPE, OSU_GAME_MODE, OsuRanking, OsuUser, OsuUserScore, OsuRankings
};