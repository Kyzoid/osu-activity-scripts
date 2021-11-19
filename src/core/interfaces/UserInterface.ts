import ScoreInterface from './ScoreInterface';

export default interface UserInterface {
  id: number;
  username: string;
  accuracy: number;
  globalRank: number;
  playCount: number;
  pp: number;
  isRanked: boolean;
  isActive: boolean;
}