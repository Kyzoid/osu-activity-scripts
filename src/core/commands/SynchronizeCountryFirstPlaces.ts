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
      console.log(`SynchronizeCFP: ${beatmapIndex}/${beatmaps.length} beatmaps...`);
      beatmapIndex++;

      const beatmapScores = await this.osuGateway.getBeatmapScores(beatmap.id, 'mania', 'country');
      const firstPlaceScore = beatmapScores[0];
      
      const user = users.find(u => u.id === firstPlaceScore.userId);
      if (!user) continue;
      
      usersFirstPlaces[firstPlaceScore.userId].push(beatmap.id);
    }

    let userIndex = 1;
    for (const user of users) {
      console.log(`Saving usersCFP: ${userIndex}/${users.length} users...`);
      user.countryFirstPlaces = usersFirstPlaces[user.id];
      await this.firebaseGateway.setUser(user.id.toString(), user);
      userIndex++;
    }

    return;
  }
}