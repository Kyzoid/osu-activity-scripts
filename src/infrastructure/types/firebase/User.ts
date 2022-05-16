import { UserCountryFirstPlaceType, UserKeysType, UserScoresType } from "src/core/interfaces/UserInterface";

export default interface User {
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
  cfpCountByKeysAndScores?: { [key in UserKeysType]: { [score in UserScoresType]: number } };
  cfpCountByScores?: { [score in UserScoresType]: number };
  cfpCount?: number;

  cfpScoreAverageByKeys?: { [key in UserKeysType]: number };
  cfpScoreAverage?: number;
}