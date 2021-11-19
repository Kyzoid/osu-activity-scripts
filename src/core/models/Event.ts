import { EventInterface } from '../interfaces';

export default class Event implements EventInterface {
  constructor(
    public id: number,
    public type: string,
    public createdAt: string,
    public userId: number,
    public username: string,
    public avatarURL: string,
  ) { }
}