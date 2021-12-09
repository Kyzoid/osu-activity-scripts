import { DocumentReference, DocumentData } from 'firebase-admin/firestore';
import { db, rt } from '../../firebaseInit';
import { FirebaseGatewayInterface, UserInterface, ScoreInterface, JobInterface, PPEventInterface, BeatmapInterface } from '../../core/interfaces';
import { FireEventHistory, FireJob, FireUser, FireBeatmap } from '../types';
import { User, Job, Beatmap } from '../../core/models';

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
      users.push(new User(userData.id, userData.username, userData.accuracy, userData.globalRank, userData.playCount, userData.pp, userData.isRanked, userData.isActive, userData.countryFirstPlaces));
    });

    return users;
  }

  async getUser(id: string): Promise<UserInterface | undefined> {
    const userDoc = await db.collection('users').doc(id).get();

    if (!userDoc.exists) {
      return;
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
      userData.isActive,
      userData.countryFirstPlaces
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

    if (user.countryFirstPlaces) {
      data.countryFirstPlaces = user.countryFirstPlaces;
    }
    
    await db.collection('users').doc(id).set(data, { merge: true });

    return;
  }

  async getBeatmaps(): Promise<BeatmapInterface[]> {
    const beatmaps: BeatmapInterface[] = [];
    const snapshot = await db.collection('beatmaps').get();

    snapshot.forEach((beatmapDoc) => {
      const beatmapData = beatmapDoc.data() as FireBeatmap;
      beatmaps.push(new Beatmap(
        beatmapData.id,
        beatmapData.beatmapsetId,
        beatmapData.artist,
        beatmapData.creator,
        beatmapData.title,
        beatmapData.difficultyRating,
        beatmapData.version,
        beatmapData.mode,
      ));
    });

    return beatmaps;
  }

  async getBeatmap(id: string): Promise<BeatmapInterface | undefined> {
    const beatmapDoc = await db.collection('beatmaps').doc(id).get();

    if (!beatmapDoc.exists) {
      return;
    }

    const beatmapData = beatmapDoc.data() as FireBeatmap;

    return new Beatmap(
      beatmapData.id,
      beatmapData.beatmapsetId,
      beatmapData.artist,
      beatmapData.creator,
      beatmapData.title,
      beatmapData.difficultyRating,
      beatmapData.version,
      beatmapData.mode,
    );
  }

  async setBeatmap(id: string, beatmap: BeatmapInterface): Promise<void> {
    const data: FireBeatmap = {
      id: beatmap.id,
      beatmapsetId: beatmap.beatmapsetId,
      artist: beatmap.artist,
      creator: beatmap.creator,
      title: beatmap.title,
      difficultyRating: beatmap.difficultyRating,
      version: beatmap.version,
      mode: beatmap.mode,
    };
    
    await db.collection('beatmaps').doc(id).set(data);

    return;
  }
}