import { DocumentReference, DocumentData } from "firebase/firestore";

export default interface Score {
  id: number;
  accuracy: number;
  createdAt: string;
  pp: number;
  rank: string;
  score: number;
  user: DocumentReference<DocumentData>;
  mods: string[]
}