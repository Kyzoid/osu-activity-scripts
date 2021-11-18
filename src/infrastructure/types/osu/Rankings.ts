import UserStatistics from './UserStatistics';

export default interface Rankings {
  cursor: {
    page: number;
  };
  ranking: UserStatistics[];
}