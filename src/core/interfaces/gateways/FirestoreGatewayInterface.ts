import { FireUser } from "src/domain/types";
import { UserInterface } from '..';

export interface FirestoreGatewayInterface {
  getUsers(): Promise<UserInterface[]>
  getUser(id: string): Promise<UserInterface>
  setUser(id: string, user: UserInterface): Promise<void>
}