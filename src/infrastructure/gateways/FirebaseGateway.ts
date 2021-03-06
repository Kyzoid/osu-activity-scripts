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
      users.push(User.createUserFromFireUser(userData));
    });

    return users;
  }

  async getTopFiftyUsers(): Promise<UserInterface[]> {
    const users: UserInterface[] = [];
    const snapshot = await db.collection('users').where('countryRank', '<=', 50).get();

    snapshot.forEach((userDoc) => {
      const userData = userDoc.data() as FireUser;
      users.push(User.createUserFromFireUser(userData));
    });

    return users;
  }

  async getUser(id: string): Promise<UserInterface | undefined> {
    const userDoc = await db.collection('users').doc(id).get();

    if (!userDoc.exists) {
      return;
    }

    const userData = userDoc.data() as FireUser;

    return User.createUserFromFireUser(userData);
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

    if (user.countryRank) {
      data.countryRank = user.countryRank;
    }

    if (user.coverUrl) {
      data.coverUrl = user.coverUrl;
    }

    if (user.avatarUrl) {
      data.avatarUrl = user.avatarUrl;
    }

    if (user.cfpCount) {
      data.cfpRank = user.cfpRank;
      data.cfp = user.cfp;
      data.cfpCountByKeys = user.cfpCountByKeys;
      data.cfpCountByScores = user.cfpCountByScores;
      data.cfpCountByKeysAndScores = user.cfpCountByKeysAndScores;
      data.cfpCount = user.cfpCount;
      data.cfpScoreAverageByKeys = user.cfpScoreAverageByKeys;
      data.cfpScoreAverage = user.cfpScoreAverage;
    }
    
    await db.collection('users').doc(id).set(data, { merge: true });

    return;
  }

  async setUserCountryFirstPlaces() {
    
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
        beatmapData.keys
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
      beatmapData.keys
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
      keys: Beatmap.getKeysFromBeatmapVersion(beatmap.version)
    };
    
    await db.collection('beatmaps').doc(id).set(data);

    return;
  }
}