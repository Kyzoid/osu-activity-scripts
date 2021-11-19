import { UserInterface, ScoreInterface } from '../interfaces';

export default class User implements UserInterface {
  constructor(
    public id: number,
    public username: string,
    public accuracy: number,
    public globalRank: number,
    public playCount: number,
    public pp: number,
    public isRanked: boolean,
    public isActive: boolean,
  ) { }
}