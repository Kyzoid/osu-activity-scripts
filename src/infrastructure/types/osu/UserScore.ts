export default interface UserScore {
  id: number;
  user_id: number;
  accuracy: number;
  mods: string[]
  score: number;
  rank: string;
  created_at: string;
  pp: number;
  replay: boolean;
}