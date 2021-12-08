export default interface Score {
  id: number;
  user_id: number;
  score: number;
  mods: [];
  max_combo: number;
  rank: string;
  created_at: string;
  pp: number;
  mode: string;
  // more...
}