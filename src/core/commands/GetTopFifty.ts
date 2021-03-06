import { FirebaseGatewayInterface, OsuGatewayInterface, } from '../interfaces';

export class GetTopFifty {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    const users = await this.osuGateway.getRankings('mania', 'fr', 1);

    let index = 1;
    for (const user of users) {
      console.log(`GetTopFifty: ${index}/${users.length}... (${user.username})`);
      const osuUser = await this.osuGateway.getUser(user.id);
      user.countryRank = osuUser.countryRank;
      await this.firebaseGateway.setUser(user.id.toString(), user);
      index++;
    }

    return;
  }
}