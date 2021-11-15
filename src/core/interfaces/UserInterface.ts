import { ScoreInterface } from './ScoreInterface';

export interface UserInterface {
  id: number,
  username: string,
  accuracy: number,
  globalRank: number,
  pp: number,
  scores: ScoreInterface[],
}