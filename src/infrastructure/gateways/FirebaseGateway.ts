import { DocumentReference, DocumentData } from 'firebase-admin/firestore';
import { db, rt } from '../../firebaseInit';
import { FirebaseGatewayInterface, UserInterface, ScoreInterface, JobInterface, PPEventInterface } from '../../core/interfaces';
import { FireEventHistory, FireJob, FireUser } from '../types';
import { User, Job } from '../../core/models';

export class FirebaseGateway implements FirebaseGatewayInterface {
  async setLastJob(count: number, createdAt: string): Promise<void> {
    const dbRef = rt.ref();
    await dbRef.child(`jobs/job_${new Date(createdAt).getTime()}`).set({ count, createdAt });
    return;
  }

  async setEvent(event: PPEventInterface): Promise<void> {
    const data: FireEventHistory = {
      ...event
    };
    
    await db.collection('events').doc().set(data);

    return;
  }

  async getLastJob(): Promise<JobInterface> {
    const dbRef = rt.ref();
    const snapshot = await dbRef.child('jobs').orderByKey().limitToLast(1).get();
    const job = snapshot.val() as FireJob;
    const key = Object.keys(job)[0];
    return new Job(job[key].count, job[key].createdAt);
  }

  async getUsers(): Promise<UserInterface[]> {
    const users: UserInterface[] = [];
    const snapshot = await db.collection('users').get();

    snapshot.forEach((userDoc) => {
      const userData = userDoc.data() as FireUser;
      users.push(new User(userData.id, userData.username, userData.accuracy, userData.globalRank, userData.playCount, userData.pp, userData.isRanked, userData.isActive));
    });

    return users;
  }

  async getUser(id: string): Promise<UserInterface> {
    const userDoc = await db.collection('users').doc(id).get();

    if (!userDoc.exists) {
      throw new Error(`Document /users/${id} not found`);
    }

    const userData = userDoc.data() as FireUser;

    return new User(
      userData.id,
      userData.username,
      userData.accuracy,
      userData.globalRank,
      userData.playCount,
      userData.pp,
      userData.isRanked,
      userData.isActive
    );
  }

  async setUser(id: string, user: UserInterface): Promise<void> {
    const data: FireUser = {
      id: user.id,
      username: user.username,
      accuracy: user.accuracy,
      globalRank: user.globalRank,
      playCount: user.playCount,
      pp: user.pp,
      isRanked: user.isRanked,
      isActive: user.isActive
    };
    
    await db.collection('users').doc(id).set(data);

    return;
  }
}