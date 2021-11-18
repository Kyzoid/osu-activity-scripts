import { FirestoreGatewayInterface, OsuGatewayInterface, } from '../interfaces';

export class GetTopFifty {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firestoreGateway: FirestoreGatewayInterface
  ) { }

  async execute() {
    const users = await this.osuGateway.getRankings('mania', 'fr', 1);

    const promises = [];
    for (const user of users) {
      promises.push(this.firestoreGateway.setUser(user.id.toString(), user));
    }

    await Promise.all(promises);
    
    return;
  }
}