import { BeatmapInterface } from '../interfaces';

export default class Beatmap implements BeatmapInterface {
  constructor(
    public id: number,
    public beatmapsetId: number,
    public artist: string,
    public creator: string,
    public title: string,
    public difficultyRating: number,
    public version: string,
    public mode: string,
    public keys: string,
  ) { }

  static getKeysFromBeatmapVersion(version: string): string {
    const match = version.match(/\dK/);
    return match ? match[0] : '0K';
  }
}