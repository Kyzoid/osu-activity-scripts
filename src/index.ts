import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { OsuGateway } from './infrastructure/gateways';
import { FirebaseGateway } from './infrastructure/gateways';
import { Score, User } from './core/models';
import { GetTopFifty } from './core/commands/GetTopFifty';
import { GetRecentTopPlays } from './core/commands/GetRecentTopPlays';

const main = async () => {
  try {
    const token: string = await axios.post('https://osu.ppy.sh/oauth/token', {
      client_id: process.env.OSU_CLIENT_ID,
      client_secret: process.env.OSU_CLIENT_SECRET,
      grant_type: 'client_credentials',
      scope: 'public',
    }).then(res => res.data.access_token);

    const osuGateway = new OsuGateway(token);
    const firebaseGateway = new FirebaseGateway();

    const getTopFifty = new GetTopFifty(osuGateway, firebaseGateway);
    const getRecentTopPlays = new GetRecentTopPlays(osuGateway, firebaseGateway);

    console.log('getTopFifty');
    await getTopFifty.execute();
    console.log('getRecentTopPlays');
    await getRecentTopPlays.execute();
  } catch (e) {
    console.log(e);
  }

  return;
};

main();