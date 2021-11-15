require('dotenv').config();

const axios = require('axios');
const { app: firebaseApp, db: firestore } = require('./firebaseInit');

const getToken = async () => {
  const response = await axios.post('https://osu.ppy.sh/oauth/token', {
    client_id: process.env.OSU_CLIENT_ID,
    client_secret: process.env.OSU_CLIENT_SECRET,
    grant_type: 'client_credentials',
    scope: 'public',
  });

  return response.data.access_token;
};

const main = async () => {
  try {
    const token = await getToken();

    const instance = axios.create({
      baseURL: process.env.OSU_BASE_URL,
      timeout: 5000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const ranking = await instance.get('/rankings/mania/performance?country=fr&page=1').then((res: any) => res.data);
    console.log(ranking);

  } catch (e) {
    console.log(e);
  }
};

main();