import { Ranking } from './Ranking';
import { User } from './User';
import { UserScore } from './UserScore';
import { Rankings } from './Rankings';

enum SCORE_TYPE {
  BEST = 'best',
  FIRSTS = 'firsts',
  RECENT = 'recent'
}

enum GAME_MODE {
  FRUITS = 'fruits',
  MANIA = 'mania',
  OSU = 'osu',
  TAIKO = 'taiko'
}

export { SCORE_TYPE, GAME_MODE, Ranking, User, UserScore, Rankings };