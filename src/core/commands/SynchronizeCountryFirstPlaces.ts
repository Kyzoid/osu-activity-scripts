import { FirebaseGatewayInterface, OsuGatewayInterface } from '../interfaces';

export class SynchronizeCountryFirstPlaces {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    const beatmaps = await this.firebaseGateway.getBeatmaps();
    const users = await this.firebaseGateway.getUsers();

    const usersFirstPlaces = users.reduce((acc: { [key: string]: number[] }, user) => {
      acc[user.id] = [];
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
          usersFirstPlaces[firstPlaceScore.userId].push(beatmap.id);
        } else {
          console.log(`Creating user (${firstPlaceScore.userId})`);
          const newUser = await this.osuGateway.getUser(firstPlaceScore.userId);
          users.push(newUser);
          usersFirstPlaces[firstPlaceScore.userId] = [beatmap.id];
        }
      }
    }

    let userIndex = 1;
    for (const user of users) {
      console.log(`Saving user: ${userIndex}/${users.length} users... (${user.id})`);
      user.countryFirstPlaces = usersFirstPlaces[user.id];
      await this.firebaseGateway.setUser(user.id.toString(), user);
      userIndex++;
    }

    return;
  }
}