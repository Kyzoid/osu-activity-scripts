import { FirebaseGatewayInterface, OsuGatewayInterface, } from '../interfaces';
import { UserKeysType } from '../interfaces/UserInterface';

export class _Helper {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    return;
  }
}