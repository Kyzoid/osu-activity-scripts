import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { OsuGatewayInterface } from '../../core/interfaces';
import { OSU_GAME_MODE, OsuRankings, OSU_SCORE_TYPE, OsuUserScore } from '../types';

export class OsuGateway implements OsuGatewayInterface {
  axiosInstance: AxiosInstance;

  constructor(token: string) {
    this.axiosInstance = axios.create({
      baseURL: process.env.OSU_BASE_URL,
      timeout: 5000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getUserScores(userId: number, type: OSU_SCORE_TYPE, mode: OSU_GAME_MODE, limit: number): Promise<OsuUserScore[]> {
    return this.axiosInstance.get(`/users/${userId}/scores/${type}?mode=${mode}&limit=${limit}`)
      .then((res: AxiosResponse<OsuUserScore[]>) => res.data);
  }

  getRankings(mode: string, countryCode: string, page: number): Promise<OsuRankings> {
    return this.axiosInstance.get(`/rankings/${mode}/performance?country=${countryCode}&page=${page}`)
      .then((res: AxiosResponse<OsuRankings>) => res.data);
  }
}