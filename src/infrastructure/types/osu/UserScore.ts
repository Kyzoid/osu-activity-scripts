export default interface UserScore {
  id: number;
  user_id: number;
  user: {
    id: number;
    username: string;
    avatar_url: string;
  }
  accuracy: number;
  mods: string[]
  score: number;
  rank: string;
  created_at: string;
  pp: number;
  replay: boolean;
  beatmap: {
    id: number;
    beatmapset_id: number;
    version: string;
  };
  beatmapset: {
    artist: string;
    title: string;
  }
}