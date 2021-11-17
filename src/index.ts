import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { OsuGateway } from './infrastructure/gateways';
import { FirestoreGateway } from './infrastructure/gateways';
import { Score, User } from './core/models';

const main = async () => {
  try {
    // const token: string = await axios.post('https://osu.ppy.sh/oauth/token', {
    //   client_id: process.env.OSU_CLIENT_ID,
    //   client_secret: process.env.OSU_CLIENT_SECRET,
    //   grant_type: 'client_credentials',
    //   scope: 'public',
    // }).then(res => res.data.access_token);

    // const osuGateway = new OsuGateway(token);

    const firestoreGateway = new FirestoreGateway();


    const testUser = new User(1, 'Test', 0.9901, 12, 12028, [
      new Score(1, 0.9991, '', 1200, 'S', 998232, 'users/1', ['DTFL']),
      new Score(2, 0.8865, '', 21, 'B', 678327, 'users/1', ['']),
      new Score(3, 0.9911, '', 788, 'S', 991229, 'users/1', ['HD']),
    ]);
    await firestoreGateway.setUser(testUser.id.toString(), testUser);

    const user = await firestoreGateway.getUser('1');
    console.log(user);
  } catch (e) {
    console.log(e);
  }
};

main();