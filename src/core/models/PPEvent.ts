import { PPEventInterface } from '../interfaces';
import Event from './Event';

export default class PPEvent extends Event implements PPEventInterface {
  constructor(
    public accuracy: number,
    public artist: string,
    public beatmapDifficulty: string,
    public beatmapTitle: string,
    public beatmapId: number,
    public beatmapsetId: number,
    public rank: string,
    public mods: string[],
    public pp: number,
    public id: number,
    public type: string,
    public createdAt: string,
    public userId: number,
    public username: string,
    public avatarURL: string,
  ) {
    super(id, type, createdAt, userId, username, avatarURL);
  }
}