import FireUser from './firebase/User';
import FireJob from './firebase/Job';
import FireEventHistory from './firebase/EventHistory';
import FireBeatmap from './firebase/Beatmap';

import OsuUserStatistics from './osu/UserStatistics';
import OsuUser from './osu/User';
import OsuUserScore from './osu/UserScore';
import OsuRankings from './osu/Rankings';
import OsuBeatmapsetSearchResults from './osu/BeatmapsetSearchResults';
import OsuBeatmapsetFilter from './osu/BeatmapsetFilter';

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
  FireJob, FireUser, FireEventHistory, FireBeatmap,
  OSU_SCORE_TYPE, OSU_GAME_MODE, OsuUserStatistics, OsuUser, OsuUserScore, OsuRankings, OsuBeatmapsetSearchResults, OsuBeatmapsetFilter
};