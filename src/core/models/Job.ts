import { JobInterface } from "../interfaces";

export default class Job implements JobInterface {
  constructor(
    public count: number,
    public createdAt: string
  ) { }
}