import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { OsuGatewayInterface } from '../../core/interfaces';
import { GAME_MODE, Rankings, SCORE_TYPE, UserScore } from '../types';

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

  getUserScores(userId: number, type: SCORE_TYPE, mode: GAME_MODE, limit: number): Promise<UserScore[]> {
    return this.axiosInstance.get(`/users/${userId}/scores/${type}?mode=${mode}&limit=${limit}`)
      .then((res: AxiosResponse<UserScore[]>) => res.data);
  }

  getRankings(mode: string, countryCode: string, page: number): Promise<Rankings> {
    return this.axiosInstance.get(`/rankings/${mode}/performance?country=${countryCode}&page=${page}`)
      .then((res: AxiosResponse<Rankings>) => res.data);
  }
}