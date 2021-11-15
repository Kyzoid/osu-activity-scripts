import { Ranking } from './Ranking';

export type Rankings = {
  cursor: {
    page: number;
  };
  ranking: Ranking[];
}