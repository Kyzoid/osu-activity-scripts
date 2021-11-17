export default interface Ranking {
  grade_counts: {
    a: number;
    s: number;
    sh: number;
    ss: number;
    ssh: number;
  };
  hit_accuracy: number;
  play_count: number;
  pp: number;
  global_rank: number;
  user: {
    id: number;
    username: string;
  };
};