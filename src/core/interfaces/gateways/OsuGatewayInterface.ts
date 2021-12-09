import { OSU_GAME_MODE, OsuRankings, OsuUserScore, OSU_SCORE_TYPE } from '../../../infrastructure/types';
import { User, Score, Beatmap, BeatmapScore } from '../../models';

export interface OsuGatewayInterface {
  getRankings(mode: string, countryCode: string, page: number): Promise<User[]>;
  getUserScores(userId: number, type: OSU_SCORE_TYPE, mode: OSU_GAME_MODE, limit: number): Promise<Score[]>
  searchBeatmapsets(filters: {}): Promise<{ beatmaps: Beatmap[], _id: string | undefined, approved_date: string | undefined }>
  getBeatmapScores(beatmapId: number, mode: string, type: string): Promise<BeatmapScore[]>
}