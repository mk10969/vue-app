<template>
  <v-container fill-height fluid grid-list-xl>
   <v-layout wrap>
    <v-flex md14 sm12 lg30>
    <v-toolbar color="#9ccc65" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>aaaaa</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    </v-flex>

    <v-flex md14 sm12 lg30>
      <!-- 開催日 -->
      <v-card>
        <v-tabs grow v-model="race_held_onboarding" slider-color="black">
          <v-tab
            v-for="date in dates"
            :key="date"
            :href="'#' + date"
            @click="click2()"
          >
            {{ get_racing_held(year, date) }}
          </v-tab>
        </v-tabs>
      </v-card>
      
      <!-- 開催競馬場 -->
      <v-card>
        <v-tabs grow v-model="race_cource_onboarding" slider-color="black">
          <v-tab
            v-for="i in cource_list"
            :key="i"
            :href="'#' + i"
            @click="click2()"
          >
            {{ get_race_name(i) }}
          </v-tab>
        </v-tabs>
      </v-card>

      <!-- レーズ番号 -->
      <v-card >
        <v-item-group v-model="race_number_onboarding" mandatory>
          <v-item v-for="n in 12" :key="`btn-${n}`">


            <v-btn
              flat round large
              slot-scope="{ active, toggle }"
              :input-value="active"
              @click="toggle()"
            >
              {{ n }}R
            </v-btn>



          </v-item>
        </v-item-group>
      </v-card>

      <!-- 出走馬一覧 -->
      <v-window v-model="race_number_onboarding">
        <v-window-item 
          v-for="n in 12"
          :key="`card-${n}`"
        >
          <v-card>
            <v-card-title>
              {{ `card-${n}` }}
            </v-card-title>
          </v-card>
          <!-- <HorseTable :horse_data="horse_data()"></HorseTable> -->
          <!-- <HorseTable ></HorseTable>     -->

        </v-window-item>
      </v-window>
      
      <v-card>
        aaaaaaaa
      </v-card>
    </v-flex>
   </v-layout>
  </v-container>
</template>

<script>
import DataFrame from 'dataframe-js';
import moment from 'moment';
import HorseTable from './HorseTable.vue'

moment.updateLocale('ja', {
    weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
    weekdaysShort: ["日","月","火","水","木","金","土"],
});

export default {
  components: {
      HorseTable
    },

  data: () => ({
    // 下記は、一旦。
    race_code: {
      "01": "札幌", "02": "函館", "03": "福島", "04": "新潟", "05": "東京", "06": "中山", "07": "中京", "08": "京都", "09": "阪神", "10": "小倉"
    },

    race_held_onboarding: null,
    race_cource_onboarding: null,
    race_number_onboarding: null,

    df_ra: null,
    df_se: null,
    
    year: null,
    dates: null,
    cource_list: null,
  }),

  async mounted() {
      let res_RA = await this.$http.get('http://127.0.0.1:5000/tw/RACE/RA/')
      this.df_ra = new DataFrame(res_RA.data.items, res_RA.data.header)
      this.year = this.df_ra.unique("開催年").toArray("開催年").toString()
      this.dates = this.df_ra.unique("開催月日").toArray("開催月日")
      this.cource_list = this.df_ra.unique("競馬場コード").toArray("競馬場コード")
      console.log(res_RA)
      console.log("res_RA完了")
      let res_SE = await this.$http.get('http://127.0.0.1:5000/tw/RACE/SE/')
      this.df_se = new DataFrame(res_SE.data.items, res_SE.data.header)

      console.log(res_SE)
      console.log("res_SE完了")
  },

  methods: {
    get_racing_held(year, date){
      return moment(year + date, "YYYYMMDD").format('YYYY年 MM月 DD日 (ddd)')
    },
    get_race_name(number){
      return this.race_code[number]
    },
    horse_data(){
      return {
        "racing_held": this.race_held_onboarding,
        "cource": this.race_cource_onboarding,
        "race_number_onboarding":this.race_number_onboarding, 
      }
    },
    click2() {
      console.log(this.race_held_onboarding)
      console.log(this.race_cource_onboarding)
      console.log(this.race_number_onboarding)
    },
  }
}
</script>