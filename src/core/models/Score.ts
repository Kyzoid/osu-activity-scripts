import { ScoreInterface } from '../interfaces';

export default class Score implements ScoreInterface {
  constructor(
    public id: number,
    public accuracy: number,
    public createdAt: string,
    public pp: number,
    public rank: string,
    public score: number,
    public user: string,
    public mods: string[]
  ) {}
}