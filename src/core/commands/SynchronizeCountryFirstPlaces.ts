import { FirebaseGatewayInterface, OsuGatewayInterface } from '../interfaces';
import { UserCountryFirstPlaceType, UserKeysType } from '../interfaces/UserInterface';

export class SynchronizeCountryFirstPlaces {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    const beatmaps = await this.firebaseGateway.getBeatmaps();
    const users = await this.firebaseGateway.getUsers();

    const usersFirstPlaces = users.reduce((acc: { [userId: string]: UserCountryFirstPlaceType[] }, user) => {
      acc[user.id] = [];
      return acc;
    }, {});

    const usersFirstPlacesCount = users.reduce((acc: { [userId: string]: { [keys in UserKeysType]: number } }, user) => {
      acc[user.id] = { '4K': 0, '7K': 0, 'XK': 0 };
      return acc;
    }, {});

    let beatmapIndex = 1;
    for (const beatmap of beatmaps) {
      console.log(`SynchronizeCFP: ${beatmapIndex}/${beatmaps.length} beatmaps... (${beatmap.id})`);
      beatmapIndex++;

      const beatmapScores = await this.osuGateway.getBeatmapScores(beatmap.id, 'mania', 'country');
      if (beatmapScores.length) {
        const firstPlaceScore = beatmapScores[0];
      
        if (usersFirstPlaces[firstPlaceScore.userId]) {
          usersFirstPlaces[firstPlaceScore.userId].push({ beatmapId: beatmap.id, keys: beatmap.keys });
        } else {
          console.log(`Creating user (${firstPlaceScore.userId})`);
          const newUser = await this.osuGateway.getUser(firstPlaceScore.userId);
          users.push(newUser);
          usersFirstPlaces[firstPlaceScore.userId] = [{ beatmapId: beatmap.id, keys: beatmap.keys }];
          usersFirstPlacesCount[firstPlaceScore.userId] = { '4K': 0, '7K': 0, 'XK': 0 };
        }

        switch(beatmap.keys) {
          case '4K':
            usersFirstPlacesCount[firstPlaceScore.userId]['4K'] += 1;
            break;
          case '7K':
            usersFirstPlacesCount[firstPlaceScore.userId]['7K'] += 1;
            break;
          default:
            usersFirstPlacesCount[firstPlaceScore.userId]['XK'] += 1;
        }

      }
    }

    let userIndex = 1;
    for (const user of users) {
      console.log(`Saving user: ${userIndex}/${users.length} users... (${user.id})`);
      user.countryFirstPlaces = usersFirstPlaces[user.id];
      user.countryFirstPlacesCount = usersFirstPlacesCount[user.id];
      await this.firebaseGateway.setUser(user.id.toString(), user);
      userIndex++;
    }

    return;
  }
}