import { DocumentReference } from 'firebase/firestore';

export default interface User {
  id: number;
  username: string;
  accuracy: number;
  globalRank: number;
  playCount: number;
  pp: number;
  scores: DocumentReference[];
  isRanked: boolean;
  isActive: boolean;
}