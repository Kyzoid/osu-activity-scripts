import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import firebase from 'firebase-admin';
import { OsuGateway } from './infrastructure/gateways';
import { FirebaseGateway } from './infrastructure/gateways';
import { SynchronizeBeatmaps } from './core/commands/SynchronizeBeatmaps';
import { SynchronizeCountryFirstPlaces } from './core/commands/SynchronizeCountryFirstPlaces';
import { GetTopFifty } from './core/commands/GetTopFifty';
import { GetRecentTopPlays } from './core/commands/GetRecentTopPlays';
import { _Helper } from './core/commands/_Helper';

const main = async () => {
  try {
    const token = process.env.OSU_ACCESS_TOKEN || '';

    // const token = await axios.post('https://osu.ppy.sh/oauth/token',
    //   {
    //     client_id: process.env.OSU_CLIENT_ID,
    //     client_secret: process.env.OSU_CLIENT_SECRET,
    //     grant_type: 'authorization_code',
    //     code: process.env.OSU_CODE,
    //     redirect_uri: process.env.OSU_REDIRECT_URL
    //   }
    // ).then(res => {
    //   console.log(res.data.access_token);
    //   return res.data.access_token;
    // });

    const osuGateway = new OsuGateway(token);
    const firebaseGateway = new FirebaseGateway();

    const _helper = new _Helper(osuGateway, firebaseGateway);
    const synchronizeBeatmaps = new SynchronizeBeatmaps(osuGateway, firebaseGateway);
    const synchronizeCountryFirstPlaces = new SynchronizeCountryFirstPlaces(osuGateway, firebaseGateway);

    const getTopFifty = new GetTopFifty(osuGateway, firebaseGateway);
    const getRecentTopPlays = new GetRecentTopPlays(osuGateway, firebaseGateway);

    // console.log('_helper');
    // await _helper.execute();
    
    // console.log('synchronizeBeatmaps');
    // await synchronizeBeatmaps.execute();
    
    // console.log('getTopFifty');
    // await getTopFifty.execute();

    // console.log('getRecentTopPlays');
    // await getRecentTopPlays.execute();

    console.log('synchronizeCountryFirstPlaces');
    await synchronizeCountryFirstPlaces.execute();
   
    console.log('end');

    await firebase.app().delete();
  } catch (e) {
    console.log(e);
  }
};

main();