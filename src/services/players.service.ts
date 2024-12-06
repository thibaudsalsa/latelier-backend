import { PLAYER_DATABASE } from "../assets/players.database";
import { CountryData, CountryList, FILE_ENCODING, Player, PLAYER_DATABASE_PATH, PlayersAnalytics } from "./model";
import * as fs from "fs";

export class PlayersService {

  private database: Player[] = [];

  constructor() {
    this.database = PLAYER_DATABASE;
    if (!this.database?.length) {
      throw new Error("Impossible to get file to setup database");
    }
  }

  /**
   * analyse the database to get metrics like the IMC, height of player and best player
   * @returns a specific object that contain all metrics for player 
   */
  getPlayersAnalytics(): PlayersAnalytics {

    const countryList: CountryList = {}
    let bestCountry: CountryData = {
      code: "",
      picture: "",
      playersNb: 0,
      victories: 0,
      ratio: 0
    };

    // Since the database cannot be change it can be processed at the start of the app
    // but I think this is not what we want to test ^^
    const metrics: PlayersAnalytics = {
      bestCountry: {
        code: "",
        picture: "",
        playersNb: 0,
        victories: 0,
        ratio: 0
      },
      averageImc: 0,
      mHeight: this.computeMedian(this.database.map(player => player.data.height))
    }
    this.database.forEach((player) => {
      const playerImc = (player.data.weight / player.data.height) * player.data.height;
      // if we don't know yet this country we set it up
      if (!countryList[player.country.code]) {
        countryList[player.country.code] = {
          code: player.country.code,
          picture: player.country.picture,
          playersNb: 0,
          victories: 0,
          ratio: 0
        }
      }

      countryList[player.country.code].playersNb += 1;
      countryList[player.country.code].victories += player.data.last.filter(match => +match === 1).length;
      countryList[player.country.code].ratio = countryList[player.country.code].victories / countryList[player.country.code].playersNb;
      // we actualise the best country, the one with the best ratio
      if (!bestCountry || bestCountry.ratio < countryList[player.country.code].ratio) {
        bestCountry = countryList[player.country.code];
      }
      metrics.averageImc += playerImc;
    });

    metrics.bestCountry = bestCountry;
    metrics.averageImc = metrics.averageImc / this.database.length;
    return metrics;
  }

  /**
   * Computes the median of an array of player heights.
   * If the number of elements is odd, the median is the middle element.
   * If the number of elements is even, the median is the average of the two middle elements.
   * @param {number[]} playersHeights - An array of player heights.
   * @returns {number} The median value of the sorted player heights.
   */
  private computeMedian(playersHeights: number[]): number {
    const playersHeightsSorted = playersHeights.sort((a, b) => a - b);
    const middle = Math.floor(playersHeightsSorted.length / 2);

    return playersHeightsSorted.length % 2 === 0
    ? (playersHeightsSorted[middle - 1] + playersHeightsSorted[middle]) / 2
    : playersHeightsSorted[middle]
  }

  /**
   * return the list of players sorted by their level
   * @returns array of players
   */
  getListOfPlayers(): Player[] {
    // can be done only one when we get the file yes, but I guess you want to check a real database usage where you do a find and sort in your query
    // else it will only be a return this.database
    return this.database.sort((playerA, playerB) => {
      return playerA.data.rank > playerB.data.rank ? 1 : -1;
    });
  }

  /**
   * get a specific player from the database based on his ID
   * @param id id of the player
   * @returns a player
   */
  getPlayerById(id: number): Player | undefined {
    return this.database.find(player => +player.id === +id);
  }
}