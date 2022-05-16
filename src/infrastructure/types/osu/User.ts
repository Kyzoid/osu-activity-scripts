export default interface User {
  id: number;
  username: string;
  cover?: {
    url?: string; 
  };
  avatar_url: string;
  statistics: {
    global_rank: number;
    country_rank: number;
    play_count: number;
    hit_accuracy: number;
    pp: number;
    is_ranked: boolean;
  }
}