export type UserKeysType = '4K' | '7K' | 'XK';
export type UserScoresType = '1000' | '999' | '998' | '997' | '996' | 'Lower';

export default interface UserInterface {
  id: number;
  username: string;
  accuracy: number;
  globalRank: number;
  countryRank?: number;
  playCount: number;
  pp: number;
  isRanked: boolean;
  isActive: boolean;
  countryFirstPlaces?: UserCountryFirstPlaceType[];
  countryFirstPlacesCountByKeys?: { [key in UserKeysType]: number };
  countryFirstPlacesTotal?: number;
  countryFirstPlacesCountByScores?: { [score in UserScoresType]: number };
  countryFirstPlacesScoreAverage?: number;
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