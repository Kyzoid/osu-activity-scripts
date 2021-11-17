import { documentId, DocumentReference, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../../firebaseInit';
import { FirestoreGatewayInterface, UserInterface, ScoreInterface } from '../../core/interfaces';
import { FireScore, FireUser } from '../types';
import { User, Score } from '../../core/models';

export class FirestoreGateway implements FirestoreGatewayInterface {
  constructor() {

  }

  private async getScores(references: DocumentReference[]): Promise<ScoreInterface[]> {
    const scores: ScoreInterface[] = [];
    const userScoresSnapshot = await db.collection('scores').where(documentId(), 'in', references).get();
    
    userScoresSnapshot.forEach((scoreDoc) => {
      const scoreData = scoreDoc.data() as FireScore;
      scores.push(new Score(
        scoreData.id,
        scoreData.accuracy,
        scoreData.createdAt,
        scoreData.pp,
        scoreData.rank,
        scoreData.score,
        scoreData.user.path,
        scoreData.mods,
      ));
    });

    return scores;
  }

  async getUsers(): Promise<UserInterface[]> {
    const users: UserInterface[] = [];
    const snapshot = await db.collection('users').get();

    snapshot.forEach((userDoc) => {
      const userData = userDoc.data() as FireUser;
      users.push(new User(userData.id, userData.username, userData.accuracy, userData.globalRank, userData.pp, []));
    });

    return users;
  }

  async getUser(id: string): Promise<UserInterface> {
    const userDoc = await db.collection('users').doc(id).get();

    if (!userDoc.exists) {
      throw new Error(`Document /users/${id} not found`);
    }

    const userData = userDoc.data() as FireUser;
    console.log(userData.scores);
    const scores: ScoreInterface[] = userData.scores.length ? await this.getScores(userData.scores) : [];

    return new User(
      userData.id,
      userData.username,
      userData.accuracy,
      userData.globalRank,
      userData.pp,
      scores
    );
  }

  async setUser(id: string, user: UserInterface): Promise<void> {
    user.scores.forEach(async (score) => {
      await this.setScore(score.id.toString(), score);
    });

    const scoresRef: DocumentReference<DocumentData>[] = user.scores.map(s => {
      const scorePath = `scores/${s.id.toString()}`;
      return (db.doc(scorePath) as unknown) as DocumentReference<DocumentData>
    });

    const data: FireUser = {
      id: user.id,
      username: user.username,
      accuracy: user.accuracy,
      globalRank: user.globalRank,
      pp: user.pp,
      scores: scoresRef
    };
    
    await db.collection('users').doc(id).set(data);

    return;
  }

  private async setScore(id: string, score: ScoreInterface) {
    const userRef = (db.doc(score.user) as unknown) as DocumentReference<DocumentData>;

    const data: FireScore = {
      id: score.id,
      accuracy: score.accuracy,
      createdAt: score.createdAt,
      mods: score.mods,
      pp: score.pp,
      rank: score.rank,
      score: score.score,
      user: userRef
    };
    
    await db.collection('scores').doc(id).set(data);

    return;
  }
}