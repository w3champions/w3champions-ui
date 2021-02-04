import { EGameMode, RootState } from "@/store/typings";
import { moduleActionContext } from "..";
import { TournamentsHistoryState, TournamentStatus } from "./types";

import { ActionContext } from "vuex";
import { ITournament, ITournamentRecord } from "../tournaments/types";

const mod = {
  namespaced: true,
  state: {
    page: 0,
    totalTournaments: 0,
    loadingTournaments: true,
    tournaments: [] as ITournamentRecord[],
    status: TournamentStatus.onGoing,
    gameMode: EGameMode.GM_1ON1,
  } as TournamentsHistoryState,
  actions: {
    async loadTournaments(
      context: ActionContext<TournamentsHistoryState, RootState>,
      page?: number
    ) {
      const { commit, rootGetters, state, rootState } = moduleActionContext(
        context,
        mod
      );

      if (page != null && !isNaN(page)) {
        commit.SET_PAGE(page - 1);
      }
       
      const response = await rootGetters.tournamentsHistoryService.retrieveTournaments(
          state.page,
          rootState.gateway,
          state.gameMode
        );
      debugger;
      commit.SET_TOTAL_TOURNAMENTS(response.count);
      commit.SET_TOURNAMENTS(response.tournaments);
    },
    async setStatus(
      context: ActionContext<TournamentsHistoryState, RootState>,
      tournamentStatus: TournamentStatus
    ) {
      const { commit, dispatch } = moduleActionContext(context, mod);
      commit.SET_STATUS(tournamentStatus);
      commit.SET_PAGE(0);
      await dispatch.loadTournaments(undefined);
    },
    async setGameMode(
      context: ActionContext<TournamentsHistoryState, RootState>,
      gameMode: EGameMode
    ) {
      const { commit, dispatch } = moduleActionContext(context, mod);
      commit.SET_GAME_MODE(gameMode);
      commit.SET_PAGE(0);
      await dispatch.loadTournaments(undefined);
    },
  },
  mutations: {
    SET_PAGE(state: TournamentsHistoryState, page: number) {
      state.page = page;
    },
    SET_TOTAL_TOURNAMENTS(state: TournamentsHistoryState, totalTournaments: number) {
      state.totalTournaments = totalTournaments;
    },
    SET_TOURNAMENTS(state: TournamentsHistoryState, tournaments: ITournamentRecord[]) {
      state.tournaments = tournaments;
    },
    SET_STATUS(state: TournamentsHistoryState, status: TournamentStatus) {
      state.status = status;
    },
    SET_GAME_MODE(state: TournamentsHistoryState, gameMode: EGameMode) {
      state.gameMode = gameMode;
    },
  },
} as const;

export default mod;
