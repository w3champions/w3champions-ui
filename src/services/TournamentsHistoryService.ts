import { API_URL } from "@/main";
import { Gateways } from "@/store/ranking/types";
import { ITournament, ITournamentRecord } from "@/store/tournaments/types";
import { EGameMode } from "@/store/typings";
import moment from "moment";

export default class TournamentsHistoryService {
  private pageSize: number;

  constructor(pageSize: number) {
    this.pageSize = pageSize;
  }

  public async retrieveTournaments(
    page: number,
    gateway: number,
    gameMode: EGameMode
  ): Promise<{ count: number; tournaments: ITournamentRecord[] }> {
    const offset = page * this.pageSize;
    const url = `${API_URL}api/matches?offset=${offset}&gateway=${gateway}&pageSize=${this.pageSize}&gameMode=${gameMode}`;
    const sampleData = { 
        "_id" : "AO2FRKLDY", 
        "state" : 2, 
        "mode" : 1, 
        "gateway" : 20, 
        "format" : 0, 
        "players" : [
            {
                "_id" : "6PAePg64LA", 
                "battleTag" : "Gab#1546", 
                "gateway" : 20, 
                "stats" : {
                    "wins" : 0, 
                    "losses" : 0
                }, 
                "ranking" : {
                    "progress" : 0.75, 
                    "rp" : 2400, 
                    "lastGame" : 1602882487197.0, 
                    "rank" : -1, 
                    "division" : 0
                }, 
                "race" : 2, 
                "eliminated" : true, 
                "seed" : 1
            }
        ], 
        "admins" : [
    
        ], 
        "rounds" : [
    
        ], 
        "seeds" : [
    
        ], 
        "startDateTime" : "2021-01-25T22:09:00.000+0000", 
        "mapPool" : [
            0, 
            1, 
            2, 
            3, 
            4, 
            5, 
            6, 
            44, 
            12, 
            50
        ], 
        "name" : "Standard One vs One", 
        "type" : 0, 
        "_created_at" : "2021-01-22T02:26:27.283+0000", 
        "_updated_at" : "2021-01-25T22:24:05.109+0000", 
        "winner" : {
            "_id" : "6PAePg64LA", 
            "battleTag" : "Gab#1546", 
            "race" : 2
        }
    }

    const tourneyRecord = <ITournamentRecord>{};
    tourneyRecord.date = moment(sampleData.startDateTime).toDate();
    tourneyRecord.mode = sampleData.mode;
    tourneyRecord.name = sampleData.name;
    tourneyRecord.state = sampleData.state;
    tourneyRecord.winner = sampleData.winner.battleTag;


    const fakeApiCall =  () => Promise.resolve({count: 1, tournaments: [tourneyRecord]})
    //const response = await fetch(url);
    //return await response.json();
    return await fakeApiCall();
  }
}
