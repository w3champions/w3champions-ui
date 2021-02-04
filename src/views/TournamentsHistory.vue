<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card tile>
          <v-card-title>Tournament History</v-card-title>
          <v-card-text></v-card-text>
          <tournaments-grid 
          v-model="tournamentRecords"
          :totalTournaments="totalTournaments"
          @pageChanged="onPageChanged"
          :itemsPerPage="50"
          ></tournaments-grid>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import TournamentsGrid from "@/components/tournaments/TournamentsGrid.vue";
import { ITournamentRecord, ITournamentRound } from "@/store/tournaments/types";

@Component({
  components: {
    TournamentsGrid,
  },
})
export default class TournamentsView extends Vue {
  mounted() {
    this.getTournamentRecords(1);
    console.log(this.tournamentRecords);
  }

  public getTournamentRecords(page?: number) {
    this.$store.direct.dispatch.tournamentsHistory.loadTournaments(page);
  }

  get tournamentRecords(): ITournamentRecord[] {
    return this.$store.direct.state.tournamentsHistory.tournaments;
  }

  get totalTournaments(): number {
    return this.$store.direct.state.tournamentsHistory.totalTournaments;
  }

  onPageChanged(page: number) {
    this.getTournamentRecords(page);
  }
}
</script>