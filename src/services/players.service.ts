import { FILE_ENCODING, Player, PLAYER_DATABASE_PATH, PlayersAnalytics } from "./model";
import * as fs from "fs";

export class PlayersService {
  
  private database: Player[] = [];

  constructor() {
    try {
      const file = fs.readFileSync(PLAYER_DATABASE_PATH, { encoding: FILE_ENCODING });
      this.database = JSON.parse(file);
    } catch (err) {
      throw new Error("Impossible to get file to setup database");
    }
  }

  /**
   * analyse the database to get metrics like the IMC, height of player and best player
   * @returns a specific object that contain all metrics for player 
   */
  getPlayersAnalytics(): PlayersAnalytics {
    return {};
  }

  /**
   * return the list of players sorted by their level
   * @returns array of players
   */
  getListOfPlayers(): Player[] {
    // can be done only one when we get the file yes, but I guess you want to check a real database usage where you do a find and sort in your query
    // else it will only be a return this.database
    return this.database.sort((playerA, playerB) => {
      return playerA.level > playerB.level ? 1 : -1;
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