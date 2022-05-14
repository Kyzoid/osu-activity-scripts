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
  countryRank?: number;

  countryFirstPlaces?: UserCountryFirstPlaceType[];
  countryFirstPlacesCountByKeys?: { [key in UserKeysType]: number };
  countryFirstPlacesTotal?: number;
  countryFirstPlacesCountByScores?: { [score in UserScoresType]: number };
  countryFirstPlacesScoreAverage?: number;
}