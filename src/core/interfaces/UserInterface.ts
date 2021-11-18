import { ScoreInterface } from './ScoreInterface';

export interface UserInterface {
  id: number;
  username: string;
  accuracy: number;
  globalRank: number;
  playCount: number;
  pp: number;
  scores: ScoreInterface[];
  isRanked: boolean;
  isActive: boolean;
}