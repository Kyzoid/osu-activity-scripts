import { UserInterface, JobInterface, PPEventInterface, BeatmapInterface } from '..';

export interface FirebaseGatewayInterface {
  getUsers(): Promise<UserInterface[]>
  getTopFiftyUsers(): Promise<UserInterface[]>
  getUser(id: string): Promise<UserInterface | undefined>
  setUser(id: string, user: UserInterface): Promise<void>

  getBeatmaps(): Promise<BeatmapInterface[]>
  getBeatmap(id: string): Promise<BeatmapInterface | undefined>
  setBeatmap(id: string, beatmap: BeatmapInterface): Promise<void>

  getLastJob(): Promise<JobInterface>
  setLastJob(count: number, createdAt: string): Promise<void>

  setEvent(event: PPEventInterface): Promise<void>
}