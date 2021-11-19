import EventInterface from './EventInterface';

export default interface PPEventInterface extends EventInterface {
  accuracy: number;
  artist: string;
  beatmapDifficulty: string;
  beatmapId: number;
  beatmapsetId: number;
  rank: string;
  mods: string[];
  pp: number;
}