import { FirebaseGatewayInterface, OsuGatewayInterface } from '../interfaces';
import UserInterface, { ComputedCfp, UserCountryFirstPlaceType, UserKeysType, UserScoresType } from '../interfaces/UserInterface';

export class SynchronizeCountryFirstPlaces {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    const beatmaps = await this.firebaseGateway.getBeatmaps();
    const users: UserInterface[] = [];

    const usersCfp: { [userId: string]: UserCountryFirstPlaceType[] } = {};

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
      
        if (usersCfp[beatmapScore.userId]) {
          usersCfp[beatmapScore.userId].push(cfp);
        } else {
          const user = await this.osuGateway.getUser(beatmapScore.userId);
          users.push(user);
          usersCfp[beatmapScore.userId] = [cfp];
        }
      }
    }

    users.sort((u1, u2) => (u2.cfpCount || 0) - (u1.cfpCount || 0));

    let userIndex = 1;
    for (const user of users) {
      console.log(`Saving users: ${userIndex}/${users.length}... (${user.username} #${user.id})`);

      const { cfpCountByKeys, cfpCountByScores, cfpCountByKeysAndScores, cfpCount, cfpScoreAverageByKeys, cfpScoreAverage } = this.computeCfp(usersCfp[user.id]);

      user.cfpRank = userIndex;
      user.cfp = usersCfp[user.id];
      user.cfpCountByKeys = cfpCountByKeys;
      user.cfpCountByScores =cfpCountByScores;
      user.cfpCountByKeysAndScores = cfpCountByKeysAndScores;
      user.cfpCount = cfpCount;
      user.cfpScoreAverageByKeys = cfpScoreAverageByKeys;
      user.cfpScoreAverage = cfpScoreAverage;
      
      await this.firebaseGateway.setUser(user.id.toString(), user);
      userIndex++;
    }

    return;
  }

  private computeCfp(usersCfp: UserCountryFirstPlaceType[]): ComputedCfp {
    const keys: UserKeysType[] = ['4K', '7K', 'XK'];
    const cfpByKeys = {
      '4K': usersCfp.filter((cfp) => cfp.keys === '4K'),
      '7K': usersCfp.filter((cfp) => cfp.keys === '7K'),
      'XK': usersCfp.filter((cfp) => cfp.keys !== '4K' && cfp.keys !== '7K'),
    };
    const cfpTotalScoreByKeys = { '4K': 0, '7K': 0, 'XK': 0 };

    const cfpCountByKeys = { '4K': 0, '7K': 0, 'XK': 0 };
    const cfpCountByScores = { '1000': 0, '999': 0, '998': 0, '997': 0, '996': 0, 'Lower': 0 };
    const cfpCountByKeysAndScores = {
      '4K': { '1000': 0, '999': 0, '998': 0, '997': 0, '996': 0, 'Lower': 0 },
      '7K': { '1000': 0, '999': 0, '998': 0, '997': 0, '996': 0, 'Lower': 0 },
      'XK': { '1000': 0, '999': 0, '998': 0, '997': 0, '996': 0, 'Lower': 0 }
    };

    keys.forEach((key) => {
      cfpByKeys[key].forEach((cfp) => {
        cfpCountByKeys[key] += 1;
        cfpTotalScoreByKeys[key] += cfp.score;

        if (cfp.score === 1000000) {
          cfpCountByScores['1000'] += 1;
          cfpCountByKeysAndScores[key]['1000'] += 1;
        } else if (cfp.score >= 999000 && cfp.score < 1000000) {
          cfpCountByScores['999'] += 1;
          cfpCountByKeysAndScores[key]['999'] += 1;
        } else if (cfp.score >= 998000 && cfp.score < 999000) {
          cfpCountByScores['998'] += 1;
          cfpCountByKeysAndScores[key]['998'] += 1;
        } else if (cfp.score >= 997000 && cfp.score < 998000) {
          cfpCountByScores['997'] += 1;
          cfpCountByKeysAndScores[key]['997'] += 1;
        } else if (cfp.score >= 996000 && cfp.score < 997000) {
          cfpCountByScores['996'] += 1;
          cfpCountByKeysAndScores[key]['996'] += 1;
        } else {
          cfpCountByScores['Lower'] += 1;
          cfpCountByKeysAndScores[key]['Lower'] += 1;
        }
      });
    });

    const cfpCount = Object.values(cfpCountByKeys).reduce((acc, count) => acc + count, 0);

    const cfpScoreAverageByKeys = {
      '4K': cfpCountByKeys['4K'] ? Math.round(cfpTotalScoreByKeys['4K'] / cfpCountByKeys['4K']) : 0,
      '7K': cfpCountByKeys['7K'] ? Math.round(cfpTotalScoreByKeys['7K'] / cfpCountByKeys['7K']) : 0,
      'XK': cfpCountByKeys['XK'] ? Math.round(cfpTotalScoreByKeys['XK'] / cfpCountByKeys['XK']) : 0,
    };

    const cfpScoreAverage = Math.round(Object.values(cfpScoreAverageByKeys).reduce((acc, count) => acc + count, 0) / 3);

    return {
      cfpCountByKeys,
      cfpCountByScores,
      cfpCountByKeysAndScores,
      cfpCount,
      cfpScoreAverageByKeys,
      cfpScoreAverage
    };
  }
}