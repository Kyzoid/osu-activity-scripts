import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { OsuGateway } from './infrastructure/gateways';
import { FirestoreGateway } from './infrastructure/gateways';
import { Score, User } from './core/models';
import { GetTopFifty } from './core/commands/GetTopFifty';

const main = async () => {
  try {
    const token: string = await axios.post('https://osu.ppy.sh/oauth/token', {
      client_id: process.env.OSU_CLIENT_ID,
      client_secret: process.env.OSU_CLIENT_SECRET,
      grant_type: 'client_credentials',
      scope: 'public',
    }).then(res => res.data.access_token);

    const osuGateway = new OsuGateway(token);
    const firestoreGateway = new FirestoreGateway();
    
    const getTopFifty = new GetTopFifty(osuGateway, firestoreGateway);
    await getTopFifty.execute();
  } catch (e) {
    console.log(e);
  }

  return;
};

main();