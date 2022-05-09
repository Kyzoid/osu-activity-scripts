export type UserKeysType = '4K' | '7K' | 'XK';

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
  countryFirstPlacesCount?: { [keys in UserKeysType]: number }
}

export type UserCountryFirstPlaceType = {
  beatmapId: number;
  keys: string;
}