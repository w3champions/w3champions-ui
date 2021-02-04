import { EGameMode } from "@/store/typings";
import { ITournament, ITournamentRecord } from "../tournaments/types";

export type TournamentsHistoryState = {
  tournaments: ITournamentRecord[];
  page: number;
  totalTournaments: number;
  loadingTournaments: boolean;
  status: TournamentStatus;
  gameMode: EGameMode;
};

export enum TournamentStatus {
  onGoing = "onGoing",
  past = "past",
}
