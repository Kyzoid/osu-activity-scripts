import { OSU_GAME_MODE, OsuRankings, OsuUserScore, OSU_SCORE_TYPE } from '../../../infrastructure/types';
import { User, Score } from '../../models';

export interface OsuGatewayInterface {
  getRankings(mode: string, countryCode: string, page: number): Promise<User[]>;
  getUserScores(userId: number, type: OSU_SCORE_TYPE, mode: OSU_GAME_MODE, limit: number): Promise<Score[]>
}