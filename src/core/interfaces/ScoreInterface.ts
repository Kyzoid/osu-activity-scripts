export default interface ScoreInterface {
  id: number;
  accuracy: number;
  artist: string;
  beatmapDifficulty: string;
  beatmapTitle: string;
  beatmapId: number;
  beatmapsetId: number;
  createdAt: string;
  rank: string;
  mods: string[];
  pp: number;
  userId: number;
  username: string;
  score: number;
  avatarURL: string;
}
