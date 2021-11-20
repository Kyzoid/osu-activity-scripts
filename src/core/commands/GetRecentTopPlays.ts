import { OSU_SCORE_TYPE, OSU_GAME_MODE } from '../../infrastructure/types';
import { FirebaseGatewayInterface, OsuGatewayInterface } from '../interfaces';
import { PPEvent } from '../models';

export class GetRecentTopPlays {
  constructor(
    private osuGateway: OsuGatewayInterface,
    private firebaseGateway: FirebaseGatewayInterface
  ) { }

  async execute() {
    const users = await this.firebaseGateway.getUsers();
    const lastJob = await this.firebaseGateway.getLastJob();

    let generatedEvents = 0;
    for (const user of users) {
      const scores = await this.osuGateway.getUserScores(user.id, OSU_SCORE_TYPE.BEST, OSU_GAME_MODE.MANIA, 100);
      console.log('scores: ', user.username);
      for (const score of scores) {
        if (new Date(score.createdAt) > new Date(lastJob.createdAt)) {
          await this.firebaseGateway.setEvent(
            new PPEvent(
              score.accuracy, score.artist, score.beatmapDifficulty, score.beatmapTitle, score.beatmapId, score.beatmapsetId,
              score.rank, score.mods, score.pp, score.id, 'PP_NEW', score.createdAt, score.userId, score.username, score.avatarURL
            )
          );
          generatedEvents++;
        }
      }
    }

    await this.firebaseGateway.setLastJob(generatedEvents, new Date().toISOString());

    return;
  }
}