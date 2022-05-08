import { UserInterface, ScoreInterface } from '../interfaces';
import { UserCountryFirstPlaceType } from '../interfaces/UserInterface';

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
    public countryRank?: number,
    public countryFirstPlaces?: UserCountryFirstPlaceType[],
    public countryFirstPlacesCount?: number,
  ) { }
}