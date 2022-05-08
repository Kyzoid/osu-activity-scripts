import { FirebaseGatewayInterface, OsuGatewayInterface, } from '../interfaces';

export class _Helper {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    const beatmaps = await this.firebaseGateway.getBeatmaps();

    const promises = [];

    console.log('Beatmaps: ', beatmaps.length);

    for (const beatmap of beatmaps) {
      console.log('synchro beatmap: ', beatmap.id);
      promises.push(this.firebaseGateway.setBeatmap(beatmap.id.toString(), beatmap));
    }

    await Promise.all(promises);

    return;
  }
}