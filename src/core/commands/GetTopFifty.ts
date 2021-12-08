import { FirebaseGatewayInterface, OsuGatewayInterface, } from '../interfaces';

export class GetTopFifty {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    const users = await this.osuGateway.getRankings('mania', 'fr', 1);

    const promises = [];
    for (const user of users.slice(0, 1)) {
      console.log('synchro: ', user.username);
      promises.push(this.firebaseGateway.setUser(user.id.toString(), user));
    }

    await Promise.all(promises);
    
    return;
  }
}