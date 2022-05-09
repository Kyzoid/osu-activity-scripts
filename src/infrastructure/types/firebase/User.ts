import { UserCountryFirstPlaceType, UserKeysType } from "src/core/interfaces/UserInterface";

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
  countryFirstPlacesCount?: { [keys in UserKeysType]: number };
}