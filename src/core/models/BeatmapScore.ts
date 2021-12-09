import { BeatmapScoreInterface } from '../interfaces';

export default class BeatmapScore implements BeatmapScoreInterface {
  constructor(
    public id: number,
    public userId: number,
    public accuracy: number,
    public mods: string[],
    public score: number,
    public maxCombo: number,
    public rank: string,
    public createdAt: string,
    public pp: number,
    public mode: string,
  ) {}
  
}