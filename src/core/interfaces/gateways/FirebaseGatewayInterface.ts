import { FireUser } from '../../../infrastructure/types';
import { UserInterface, JobInterface, PPEventInterface } from '..';

export interface FirebaseGatewayInterface {
  getUsers(): Promise<UserInterface[]>
  getUser(id: string): Promise<UserInterface>
  setUser(id: string, user: UserInterface): Promise<void>
  getLastJob(): Promise<JobInterface>
  setLastJob(count: number, createdAt: string): Promise<void>
  setEvent(event: PPEventInterface): Promise<void>
}