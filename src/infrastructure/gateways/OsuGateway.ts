import axios, { AxiosInstance, AxiosResponse } from 'axios';
import rateLimit from 'axios-rate-limit';
import { User, Score, Beatmap, BeatmapScore } from '../../core/models';
import { OsuGatewayInterface } from '../../core/interfaces';
import { OSU_GAME_MODE, OsuRankings, OSU_SCORE_TYPE, OsuUserScore, OsuBeatmapsetSearchResults, OsuBeatmapsetFilter, OsuBeatmapScores, OsuUser } from '../types';
import { URLSearchParams } from 'url';

export class OsuGateway implements OsuGatewayInterface {
  axiosInstance: AxiosInstance;

  constructor(token: string) {
    this.axiosInstance = rateLimit(
      axios.create({
        baseURL: process.env.OSU_BASE_URL,
        timeout: 20000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      {
        maxRequests: 1,
        perMilliseconds: 1100
      }
    );
  }

  async searchBeatmapsets(filters: OsuBeatmapsetFilter): Promise<{ beatmaps: Beatmap[], _id: string | undefined, approved_date: string | undefined }> {
    const searchParams = new URLSearchParams();
    filters.s ? searchParams.append('s', filters.s) : '';
    filters.m ? searchParams.append('m', filters.m.toString()) : '';
    filters.approved_date ? searchParams.append('cursor[approved_date]', filters.approved_date) : '';
    filters._id ? searchParams.append('cursor[_id]', filters._id) : '';

    console.log(searchParams.toString())
    const response = await this.axiosInstance.get<OsuBeatmapsetSearchResults>(`/beatmapsets/search?${searchParams.toString()}`).then((res) => res.data);
    console.log(response.cursor);
    const beatmaps: Beatmap[] = [];

    for (const beatmapset of response.beatmapsets) {
      if (beatmapset.beatmaps) {
        for (const beatmap of beatmapset.beatmaps) {
          if (beatmap.mode_int === 3) {
            beatmaps.push(
              new Beatmap(
                beatmap.id,
                beatmap.beatmapset_id,
                beatmapset.artist,
                beatmapset.creator,
                beatmapset.title,
                beatmap.difficulty_rating,
                beatmap.version,
                'mania',
                Beatmap.getKeysFromBeatmapVersion(beatmap.version)
              )
            );
          }
        }
      }
    }

    return {
      beatmaps,
      _id: response.cursor?._id,
      approved_date: response.cursor?.approved_date,
    };
  }

  async getBeatmapScores(beatmapId: number, mode: string, type: string): Promise<BeatmapScore[]> {
    const response = await this.axiosInstance.get<OsuBeatmapScores>(`/beatmaps/${beatmapId}/scores?mode=${mode}&type=${type}`).then((res) => res.data);

    return response.scores.map((score) => {
      return new BeatmapScore(
        score.id, score.user_id, score.accuracy, score.mods, score.score, score.max_combo, score.rank, score.created_at, score.pp, score.mode
      );
    });
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

  async getUser(userId: number): Promise<User> {
    const user = await this.axiosInstance.get<OsuUser>(`/users/${userId}/mania?key=id`).then((res) => res.data);

    return new User(
      user.id,
      user.username,
      user.statistics.hit_accuracy,
      user.statistics.global_rank,
      user.statistics.play_count,
      user.statistics.pp,
      user.statistics.is_ranked,
      true,
      user.statistics.country_rank
    );
  }
}