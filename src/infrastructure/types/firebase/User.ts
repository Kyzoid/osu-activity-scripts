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
  countryFirstPlaces?: number[];
  countryFirstPlacesCount?: number;
}