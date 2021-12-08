export default interface BeatmapInterface {
  id: number;
  beatmapsetId: number;
  artist: string;
  creator: string;
  title: string;
  difficultyRating: number;
  version: string;
  mode: string;
}