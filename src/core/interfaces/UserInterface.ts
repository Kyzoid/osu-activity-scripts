import ScoreInterface from './ScoreInterface';

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
  countryFirstPlaces?: number[];
  countryFirstPlacesCount?: number;
}