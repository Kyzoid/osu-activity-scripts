import { OsuBeatmapsetFilter } from '../../infrastructure/types';
import { FirebaseGatewayInterface, OsuGatewayInterface, } from '../interfaces';
import { Beatmap } from '../models';

export class SynchronizeBeatmaps {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    
    let hasNext = true;
    const filters: OsuBeatmapsetFilter = {
      m: 3, s: 'ranked',
    };

    while (hasNext) {
      const beatmapsResults = await this.osuGateway.searchBeatmapsets(filters);
      console.log('beatmaps: ', beatmapsResults.beatmaps.length);
      const fireResult = await this.saveBeatmaps(beatmapsResults.beatmaps);
      hasNext = fireResult.hasNext;

      if (!beatmapsResults._id || !beatmapsResults.approved_date) {
        hasNext = false;
      }
      filters._id = beatmapsResults._id;
      filters.approved_date = beatmapsResults.approved_date;
    }
    
    return;
  }

  private async saveBeatmaps(beatmaps: Beatmap[]): Promise<{ hasNext: boolean }> {
    const promises = [];
    let index = 0;
    let hasNext = true;

    for (const beatmap of beatmaps) {
      const beatmapFound = await this.firebaseGateway.getBeatmap(beatmap.id.toString());
      if (index === 0 && beatmapFound) {
        hasNext = false;
        break;
      }
      if (!beatmapFound) {
        console.log('synchro beatmap: ', beatmap.id);
        promises.push(this.firebaseGateway.setBeatmap(beatmap.id.toString(), beatmap));
      }
      index++;
    }

    await Promise.all(promises);

    return {
      hasNext,
    };
  }
}