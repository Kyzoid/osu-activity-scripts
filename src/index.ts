import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { OsuGateway } from './domain/gateways';
import { GAME_MODE, SCORE_TYPE } from './domain/types';

const main = async () => {
  try {
    const token: string = await axios.post('https://osu.ppy.sh/oauth/token', {
      client_id: process.env.OSU_CLIENT_ID,
      client_secret: process.env.OSU_CLIENT_SECRET,
      grant_type: 'client_credentials',
      scope: 'public',
    }).then(res => res.data.access_token);

    const osuGateway = new OsuGateway(token);
    
  } catch (e) {
    console.log(e);
  }
};

main();