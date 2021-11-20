import axios, { AxiosInstance, AxiosResponse } from 'axios';
import rateLimit from 'axios-rate-limit';
import { User, Score } from '../../core/models';
import { OsuGatewayInterface } from '../../core/interfaces';
import { OSU_GAME_MODE, OsuRankings, OSU_SCORE_TYPE, OsuUserScore } from '../types';

export class OsuGateway implements OsuGatewayInterface {
  axiosInstance: AxiosInstance;

  constructor(token: string) {
    this.axiosInstance = rateLimit(
      axios.create({
        baseURL: process.env.OSU_BASE_URL,
        timeout: 5000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      {
        maxRPS: 1
      }
    );
  }

  async getUserScores(userId: number, type: OSU_SCORE_TYPE, mode: OSU_GAME_MODE, limit: number): Promise<Score[]> {
    const response = await this.axiosInstance.get<OsuUserScore[]>(`/users/${userId}/scores/${type}?mode=${mode}&limit=${limit}`).then((res) => res.data);

    return response.map((score) => {
      return new Score(
        score.id, score.accuracy, score.beatmapset.artist, score.beatmap.version, score.beatmapset.title, score.beatmap.id, score.beatmap.beatmapset_id,
        score.created_at, score.rank, score.mods, score.pp, score.user_id, score.user.username, score.score, score.user.avatar_url
      );
    });
  }

  async getRankings(mode: string, countryCode: string, page: number): Promise<User[]> {
    const response = await this.axiosInstance.get<OsuRankings>(`/rankings/${mode}/performance?country=${countryCode}&page=${page}`).then((res) => res.data);

    return response.ranking.map((stats) => {
      return new User(
        stats.user.id,
        stats.user.username,
        stats.hit_accuracy,
        stats.global_rank,
        stats.play_count,
        stats.pp,
        stats.is_ranked,
        stats.user.is_active
      );
    });
  }
}