import { GAME_MODE, SCORE_TYPE } from 'src/domain/types';
import { OsuGatewayInterface } from '../interfaces';

export class GetTopFifty {
  constructor(
    private osuGateway: OsuGatewayInterface
  ) { }

  async execute() {
    // const franceRankings = await this.osuGateway.getRankings('mania', 'fr', 1);
    // const scores = await this.osuGateway.getUserScores(franceRankings.ranking[0].user.id, SCORE_TYPE.BEST, GAME_MODE.MANIA, 100);
  }
}