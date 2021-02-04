<template>
  <div>
    <div class="custom-table-wrapper elevation-1">
      <table class="custom-table">
        <thead>
          <tr>
            <td
              v-for="header in headers"
              :key="header.text"
              v-bind:style="{
                width: header.width,
                'min-width': header.minWidth,
                'text-align': header.align,
              }"
            >
              {{ header.text }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in tournamentRecords"
            :key="item.date"
            @click="goToTournamentPage(item)"
          >
            <td>
              <div class="my-3">
                <v-row justify="center">
                  <v-col offset="4" class="py-1">
                    {{item.name}}
                  </v-col>
                </v-row>
              </div>
            </td>
            <td>
              {{item.winner}}
            </td>
            <td>
              {{
                item.date | moment($t("dateFormats.dateTime").toString())
              }}
            </td>
          </tr>
          <tr v-if="!tournamentRecords || tournamentRecords.length == 0">
            <td colspan="4" class="text-center">no matches found</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="filter-blur">
      <div class="text-center font-regular mt-2">1 - 5 of 10</div>
      <v-pagination
        v-model="page"
        :length="getTotalPages()"
        :total-visible="5"
        @input="onPageChanged"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { ITournamentRecord } from "@/store/tournaments/types";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component({})
export default class TournamentsGrid extends Vue {
  @Prop() public value!: ITournamentRecord[];
  @Prop() public totalTournaments!: number;
  @Prop() public itemsPerPage!: number;

  get tournamentRecords(): ITournamentRecord[] {
    return this.value;
  }

  public onPageChanged(page: number) {
    this.$emit("pageChanged", page);
  }

  public getWinner(tournament: ITournamentRecord) {
    return tournament.winner;
  }

  public getTotalPages() {
    if (!this.totalTournaments) {
      return 1;
    }

    return Math.ceil(this.totalTournaments / 50);
  }

  public goToTournamentPage(tournament: ITournamentRecord) {
      //go to bracket
      return true;
    // this.$router.push({
    //   path: `/match/${match.id}`,
    // });
  }

  public headers = [
    {
      text: "Tournament",
      align: "center",
      sortable: false,
      value: "tournamentRecords",
      minWidth: "475px",
    },
    {
      text: "Winner",
      align: "start",
      sortable: false,
      value: "winner",
    },
    {
      text: "Start Time",
      align: "start",
      sortable: false,
      value: "startTime",
      minWidth: "170px",
    },
    {
      text: "Duration",
      align: "start",
      sortable: false,
      value: "duration",
    },
  ];
}
</script>