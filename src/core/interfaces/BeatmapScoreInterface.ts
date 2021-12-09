export default interface ScoreInterface {
  id: number;
  userId: number;
  accuracy: number;
  mods: string[];
  score: number;
  maxCombo: number;
  rank: string;
  createdAt: string;
  pp: number;
  mode: string;
}
