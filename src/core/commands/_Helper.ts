import { FirebaseGatewayInterface, OsuGatewayInterface, } from '../interfaces';
import { UserKeysType } from '../interfaces/UserInterface';

export class _Helper {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    const users = await this.firebaseGateway.getUsers();
    console.log('Users: ', users.length);

    const promises = [];

    const usersFirstPlacesCount = users.reduce((acc: { [userId: string]: { [keys in UserKeysType]: number } }, user) => {
      acc[user.id] = { '4K': 0, '7K': 0, 'XK': 0 };
      return acc;
    }, {});

    for (const user of users) {
      console.log('synchro user: ', user.id);

      user.countryFirstPlaces?.forEach((cfp) => {
        switch(cfp.keys) {
          case '4K':
            usersFirstPlacesCount[user.id]['4K'] += 1;
            break;
          case '7K':
            usersFirstPlacesCount[user.id]['7K'] += 1;
            break;
          default:
            usersFirstPlacesCount[user.id]['XK'] += 1;
        }
      });

      if (user.countryFirstPlaces) {
        user.countryFirstPlacesCount = usersFirstPlacesCount[user.id];
        user.countryFirstPlacesTotal = usersFirstPlacesCount[user.id]['4K'] + usersFirstPlacesCount[user.id]['7K'] + usersFirstPlacesCount[user.id]['XK'];
      }

      promises.push(this.firebaseGateway.setUser(user.id.toString(), user));
    }

    await Promise.all(promises);

    return;
  }
}