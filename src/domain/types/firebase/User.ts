import { DocumentReference } from 'firebase/firestore';

export default interface User {
  id: number;
  username: string;
  accuracy: number;
  globalRank: number;
  pp: number;
  scores: DocumentReference[];
}