import { UserInterface, ScoreInterface } from '../interfaces';

export class User implements UserInterface {
  constructor(
    public id: number,
    public username: string,
    public accuracy: number,
    public globalRank: number,
    public pp: number,
    public scores: ScoreInterface[],
  ) { }
}