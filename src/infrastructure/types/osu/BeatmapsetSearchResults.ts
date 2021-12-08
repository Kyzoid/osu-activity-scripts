import Beatmapset from './Beatmapset';

export default interface BeatmapsetSearchResults {
  beatmapsets: Beatmapset[];
  cursor: {
    approved_date: string;
    _id: string;
  } | null;
  search: {
    sort: string;
  };
  recommended_difficulty: number;
  error: string | null;
  total: number;
}