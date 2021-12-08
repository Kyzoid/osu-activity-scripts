import Beatmap from './Beatmap';

export default interface Beatmapset {
  artist: string;
  title: string;
  availability: {
    download_disabled:	boolean;
    more_information?:	string;
  };
  bpm: number;
  can_be_hyped: boolean;
  creator: string;
  discussion_enabled: boolean;
  discussion_locked: boolean;
  hype: {
    current: number;
    required: number;
  };
  is_scoreable: boolean;
  last_updated: string;
  legacy_thread_url?: string;
  nominations: {
    current: number;
    required: number;
  };
  ranked: number;
  ranked_date: string;
  source: string;
  storyboard: boolean;
  submitted_date: string;
  tags: string;
  beatmaps?: Beatmap[]

  // more from BeatmapsetCompact, see: https://osu.ppy.sh/docs/index.html#beatmapsetcompact
}