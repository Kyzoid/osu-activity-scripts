import { FirebaseGatewayInterface, OsuGatewayInterface } from '../interfaces';

export class _Helper {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    const users = await this.firebaseGateway.getUsers();

    let userIndex = 1;
    for (const user of users) {
      console.log(`Saving user: ${userIndex}/${users.length} users... (${user.id})`);
      const osuUser = await this.osuGateway.getUser(user.id);
      user.countryRank = osuUser.countryRank;
      await this.firebaseGateway.setUser(user.id.toString(), user);
      userIndex++;
    }

    return;
  }
}