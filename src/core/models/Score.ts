import { ScoreInterface } from '../interfaces';

export default class Score implements ScoreInterface {
  constructor(
    public id: number,
    public accuracy: number,
    public artist: string,
    public beatmapDifficulty: string,
    public beatmapTitle: string,
    public beatmapId: number,
    public beatmapsetId: number,
    public createdAt: string,
    public rank: string,
    public mods: string[],
    public pp: number,
    public userId: number,
    public username: string,
    public score: number,
    public avatarURL: string,
  ) {}
}