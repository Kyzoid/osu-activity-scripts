import { FirebaseGatewayInterface, OsuGatewayInterface } from '../interfaces';
import UserInterface, { UserCountryFirstPlaceType, UserKeysType, UserScoresType } from '../interfaces/UserInterface';

export class SynchronizeCountryFirstPlaces {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    const beatmaps = await this.firebaseGateway.getBeatmaps();
    const users: UserInterface[] = [];

    const usersFirstPlaces: { [userId: string]: UserCountryFirstPlaceType[] } = {};

    let beatmapIndex = 1;
    for (const beatmap of beatmaps) {
      const date = new Date();
      const dateString = date.toLocaleDateString('fr-FR');
      const timeString = date.toLocaleTimeString('fr-FR');
      console.log(`[${dateString} ${timeString}]` ,`Reading beatmaps: ${beatmapIndex}/${beatmaps.length}... (${beatmap.id})`);
      beatmapIndex++;

      const beatmapScores = await this.osuGateway.getBeatmapScores(beatmap.id, 'mania', 'country');
      if (beatmapScores.length) {
        const beatmapScore = beatmapScores[0];

        const cfp: UserCountryFirstPlaceType = {
          beatmapId: beatmap.id,
          keys: beatmap.keys,
          date: beatmapScore.createdAt,
          accuracy: beatmapScore.accuracy,
          mods: beatmapScore.mods,
          pp: beatmapScore.pp,
          rank: beatmapScore.rank,
          score: beatmapScore.score
        };
      
        if (usersFirstPlaces[beatmapScore.userId]) {
          usersFirstPlaces[beatmapScore.userId].push(cfp);
        } else {
          const user = await this.osuGateway.getUser(beatmapScore.userId);
          users.push(user);
          usersFirstPlaces[beatmapScore.userId] = [cfp];
        }
      }
    }

    let userIndex = 1;
    for (const user of users) {
      console.log(`Saving users: ${userIndex}/${users.length}... (${user.username} #${user.id})`);

      const { cfpByKeys, cfpCountByScores, totalScore } = this.computeFirstPlaces(usersFirstPlaces[user.id]);

      user.countryFirstPlaces = usersFirstPlaces[user.id];
      user.countryFirstPlacesCountByKeys = { '4K': cfpByKeys['4K'].length, '7K': cfpByKeys['7K'].length, 'XK': cfpByKeys['XK'].length };
      user.countryFirstPlacesTotal = cfpByKeys['4K'].length + cfpByKeys['7K'].length + cfpByKeys['XK'].length;
      user.countryFirstPlacesCountByScores = cfpCountByScores;
      user.countryFirstPlacesScoreAverage = totalScore / user.countryFirstPlacesTotal;
      
      await this.firebaseGateway.setUser(user.id.toString(), user);
      userIndex++;
    }

    return;
  }

  private computeFirstPlaces(userCountryFirstPlaces: UserCountryFirstPlaceType[]) {
    const cfpByKeys: { '4K': UserCountryFirstPlaceType[], '7K': UserCountryFirstPlaceType[], 'XK': UserCountryFirstPlaceType[] } = { '4K': [], '7K': [], 'XK': [] };
    const cfpCountByScores = { '1000': 0, '999': 0, '998': 0, '997': 0, '996': 0, 'Lower': 0 };
    let totalScore = 0;

    userCountryFirstPlaces.forEach((cfp) => {
      totalScore += cfp.score;

      if (cfp.keys === '4K') {
        cfpByKeys['4K'].push(cfp);
      } else if (cfp.keys === '7K') {
        cfpByKeys['7K'].push(cfp);
      } else {
        cfpByKeys['XK'].push(cfp);
      }

      if (cfp.score === 1000000) {
        cfpCountByScores['1000'] += 1;
      } else if (cfp.score >= 999000 && cfp.score < 1000000) {
        cfpCountByScores['999'] += 1;
      } else if (cfp.score >= 998000 && cfp.score < 999000) {
        cfpCountByScores['998'] += 1;
      } else if (cfp.score >= 997000 && cfp.score < 998000) {
        cfpCountByScores['997'] += 1;
      } else if (cfp.score >= 996000 && cfp.score < 997000) {
        cfpCountByScores['996'] += 1;
      } else {
        cfpCountByScores['Lower'] += 1;
      }
    });

    return {
      cfpByKeys, cfpCountByScores, totalScore
    }
  }
}