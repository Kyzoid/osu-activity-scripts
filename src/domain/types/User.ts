export type User = {
  id: number;
  username: string;
  statistics: {
    global_rank: number;
    play_count: number;
    hit_accuracy: number;
  }
}