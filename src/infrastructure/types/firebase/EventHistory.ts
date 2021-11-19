export default interface EventHistory {
  id: number;
  userId: number;
  username: string;
  createdAt: string;
  type: string;

  mods?: string[];
  lastRank?: number;
  newRank?: number;
  rankDifference?: number;
  accuracy?: number;
  beatmapDifficulty?: string;
  beatmapId?: number;
  beatmapTitle?: string;
  beatmapsetId?: number;
  artist?: string;
  rank?: string;
  pp?: number;
  score?: number;
  avatarURL?: string;
}