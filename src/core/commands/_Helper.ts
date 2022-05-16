import { FirebaseGatewayInterface, OsuGatewayInterface, } from '../interfaces';
import { UserKeysType } from '../interfaces/UserInterface';

export class _Helper {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    const users = await this.firebaseGateway.getUsers() as any[];

    let index = 1;
    for (const user of users) {
      console.log(`Cleaning users: ${index}/${users.length}... (${user.username} #${user.id})`);
      
      if (user.countryFirstPlaces) {
        delete user.countryFirstPlaces;
      }

      if (user.countryFirstPlacesCount) {
        delete user.countryFirstPlacesCount;
      }

      if (user.countryFirstPlacesTotal) {
        delete user.countryFirstPlacesTotal;
      }

      await this.firebaseGateway.setUser(user.id.toString(), user);
      index++;
    }

    return;
  }
}