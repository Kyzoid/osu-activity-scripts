import { FireUser } from 'src/infrastructure/types';
import { UserInterface, ScoreInterface } from '../interfaces';
import { UserCountryFirstPlaceType, UserKeysType, UserScoresType } from '../interfaces/UserInterface';

export default class User implements UserInterface {
  constructor(
    public id: number,
    public username: string,
    public accuracy: number,
    public globalRank: number,
    public playCount: number,
    public pp: number,
    public isRanked: boolean,
    public isActive: boolean,
    public coverUrl?: string,
    public avatarUrl?: string,
    public countryRank?: number,

    // COUNTRY FIRST PLACE
    public cfpRank?: number,
    public cfp?: UserCountryFirstPlaceType[],
    public cfpCountByKeys?: { [key in UserKeysType]: number },
    public cfpCountByScores?: { [score in UserScoresType]: number },
    public cfpCountByKeysAndScores?: { [key in UserKeysType]: { [score in UserScoresType]: number } },
    public cfpCount?: number,
    public cfpScoreAverageByKeys?: { [key in UserKeysType]: number },
    public cfpScoreAverage?: number,
  ) { }

  public static createUserFromFireUser(fireUser: FireUser): User {
    return new User(
      fireUser.id,
      fireUser.username,
      fireUser.accuracy,
      fireUser.globalRank,
      fireUser.playCount,
      fireUser.pp,
      fireUser.isRanked,
      fireUser.isActive,
      fireUser.coverUrl,
      fireUser.avatarUrl,
      fireUser.countryRank,

      // COUNTRY FIRST PLACE
      fireUser.cfpRank,
      fireUser.cfp,
      fireUser.cfpCountByKeys,
      fireUser.cfpCountByScores,
      fireUser.cfpCountByKeysAndScores,
      fireUser.cfpCount,
      fireUser.cfpScoreAverageByKeys,
      fireUser.cfpScoreAverage,
    );
  }
}