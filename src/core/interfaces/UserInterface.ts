export type UserKeysType = '4K' | '7K' | 'XK';
export type UserScoresType = '1000' | '999' | '998' | '997' | '996' | 'Lower';

export default interface UserInterface {
  id: number;
  username: string;
  accuracy: number;
  globalRank: number;
  playCount: number;
  pp: number;
  isRanked: boolean;
  isActive: boolean;
  coverUrl?: string;
  avatarUrl?: string;
  countryRank?: number;

  // COUNTRY FIRST PLACE
  cfpRank?: number;
  cfp?: UserCountryFirstPlaceType[];

  cfpCountByKeys?: { [key in UserKeysType]: number };
  cfpCountByScores?: { [score in UserScoresType]: number };
  cfpCountByKeysAndScores?: { [key in UserKeysType]: { [score in UserScoresType]: number } };
  cfpCount?: number;

  cfpScoreAverageByKeys?: { [key in UserKeysType]: number };
  cfpScoreAverage?: number;
}

export type UserCountryFirstPlaceType = {
  beatmapId: number;
  keys: string;
  date: string;
  accuracy: number;
  mods: string[];
  pp: number;
  rank: string;
  score: number;
}

export type ComputedCfp = {
  cfpCountByKeys: { [key in UserKeysType]: number };
  cfpCountByScores: { [score in UserScoresType]: number };
  cfpCountByKeysAndScores: { [key in UserKeysType]: { [score in UserScoresType]: number } };
  cfpCount: number;
  cfpScoreAverageByKeys: { [key in UserKeysType]: number };
  cfpScoreAverage: number;
}