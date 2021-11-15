import { GAME_MODE, Rankings, UserScore, SCORE_TYPE } from '../../../domain/types';

export interface OsuGatewayInterface {
  getRankings(mode: string, countryCode: string, page: number): Promise<Rankings>;
  getUserScores(userId: number, type: SCORE_TYPE, mode: GAME_MODE, limit: number): Promise<UserScore[]>
}