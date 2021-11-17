import Ranking from './Ranking';

export default interface Rankings {
  cursor: {
    page: number;
  };
  ranking: Ranking[];
}