export default interface BeatmapScore {
  id: number;
  user_id: number;
  accuracy: number;
  mods: string[];
  score: number;
  max_combo: number;
  passed: boolean;
  perfect: boolean;
  // statistics: {};
  rank: string;
  created_at: string;
  best_id: number;
  pp: number;
  mode: string;
  mode_int: number;
  replay: boolean;
  // user: {}
}