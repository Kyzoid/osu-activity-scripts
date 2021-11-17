export default interface EventHistory {
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
  pp?: number;
}