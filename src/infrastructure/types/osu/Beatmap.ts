export default interface Beatmap {
  id: number;
  accuracy: number;
  ar: number;
  beatmapset_id: number;
  bpm?: number;
  convert: boolean;
  count_circles: number;
  count_sliders: number;
  count_spinners: number;
  cs: number;
  deleted_at: string;
  drain: number;
  hit_length: number;
  is_scoreable: boolean;
  last_updated: string;
  mode_int: number;
  passcount: number;
  playcount: number;
  ranked: number;
  url: string;
  difficulty_rating: number;
  version: string;
}