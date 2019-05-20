<template>
  <v-container fill-height fluid grid-list-xl>
   <v-layout wrap justify-center>
    <v-flex md14 sm12 lg30>
    <v-toolbar color="#9ccc65" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>今週のお馬さん</v-toolbar-title>
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
          >
            {{ get_racing_held(year, date) }}
          </v-tab>
        </v-tabs>
      
      <!-- 開催競馬場 -->
        <v-tabs grow v-model="race_cource_onboarding" slider-color="black">
          <v-tab
            v-for="(i, index) in race_cource_list"
            :key="index"
            :href="'#' + i[1]"
          >
            {{ get_race_name(i[1]) }}
          </v-tab>
        </v-tabs>
      </v-card>

      <!-- レーズ番号 -->
      <v-card>      
        <v-item-group v-model="race_number_onboarding" mandatory>
          <v-item v-for="(n, index) in 12" :key="`btn-${index}`">
            <v-btn
              flat round large
              slot-scope="{ active, toggle }"
              :input-value="active"
              @click="toggle(); show_horse_table()"
            >
              {{ n }} R
            </v-btn>
          </v-item>
        </v-item-group>
      </v-card>
      

      <!-- 出走馬一覧 -->
      <v-window v-model="race_number_onboarding">
        <v-window-item 
          v-for="(n, index) in 12"
          :key="`card-${index}`"
        >
        <v-card>
          <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              :pagination.sync="pagination"
              class=""
          >
              <template v-slot:no-data>
                  <v-alert :value="true" color="error" icon="warning">
                  Sorry, nothing to display here :(
                  </v-alert>
              </template>

              <template slot="items" slot-scope="props">
                  <tr>
                  <td v-for="(column, index) in headers" :key="index">
                      {{ props.item[column.value] }}
                  </td>
                  </tr>
              </template>
          </v-data-table>
        </v-card>
        </v-window-item>
      </v-window>
      
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
})

async function get_RACE_RA(axios) {
  const { data } = await axios.get('http://127.0.0.1:5000/tw/RACE/RA/');
  return data
}

async function get_RACE_SE(axios) {
  const { data } = await axios.get('http://127.0.0.1:5000/tw/RACE/SE/');
  return data
}

function unique(array) {
  var storage = {};
  var uniqueArray = [];
  var i,value;
  for ( i=0; i<array.length; i++) {
    value = array[i];
    if (!(value in storage)) {
      storage[value] = true;
      uniqueArray.push(value);
    }
  }
  return uniqueArray;
}

function header_bulid(array) {
  var result = [];
  for (var i=0; i<array.length; i++) {
    result.push({"text": array[i], "value": array[i]})    
  }
  return result;
}

export default {
  components: {
      HorseTable
    },

  data: () => ({
    pagination:{
      rowsPerPage: -1,
    },
    race_code: {
      "01": "札幌", "02": "函館", "03": "福島", "04": "新潟", "05": "東京", 
      "06": "中山", "07": "中京", "08": "京都", "09": "阪神", "10": "小倉"
    },

    df_ra: null,
    df_se: null,
    
    race_held_onboarding: null,
    race_cource_onboarding: null,
    race_number_onboarding: null,

    year: null,
    dates: null,
    search: "",

    headers: null,
    items: null
  }),

  async mounted() {
      let data_ra = await get_RACE_RA(this.$http)
      console.log(data_ra)
      this.df_ra = new DataFrame(data_ra.items, data_ra.header)
      this.year = this.df_ra.unique("開催年").toArray("開催年").toString()
      this.dates = this.df_ra.unique("開催月日").toArray("開催月日").sort()
      // this.race_cource_list = this.df_ra.unique("競馬場コード").toArray("競馬場コード")
      console.log("res_RA完了")

      let data_se = await get_RACE_SE(this.$http)
      this.df_se = new DataFrame(data_se.items, data_se.header)
      console.log("res_SE完了")

      this.show_horse_table()
  },

  computed: {
    race_cource_list: function (){
      return unique(this.df_ra.filter(row => row.get("開催月日") === this.race_held_onboarding)
      .select("開催月日", "競馬場コード")
      .toArray()
      )
    },
    // race_number_list: function(){
    //   return unique(this.df_ra.filter(row => row.get("競馬場コード") === this.race_cource_onboarding)
    //   .select("競馬場コード", "レース番号")
    //   .toArray()
    //   )
    // }
  },
  
  methods: {
    get_racing_held(year, date){
      return moment(year + date, "YYYYMMDD").format('MM月 DD日 (ddd)')
    },
    get_race_name(number){
      return this.race_code[number]
    }, 
    convert_race_number(){
      if (this.race_number_onboarding < 9){
          return "0" + (this.race_number_onboarding + 1).toString()
      } else {
          return (this.race_number_onboarding + 1).toString()
      }
    },
    // horse_data(){
    //   return {
    //     "racing_held": this.race_held_onboarding,
    //     "cource": this.race_cource_onboarding,
    //     "race_number_onboarding":this.race_number_onboarding, 
    //   }
    // },
    click2() {
      console.log(this.race_held_onboarding)
      console.log(this.race_cource_onboarding)
      console.log(this.race_number_onboarding.toString())
    },
    filter_df(){
      return this.df_se
      .filter(row => row.get("開催月日") === this.race_held_onboarding)
      .filter(row => row.get("競馬場コード") === this.race_cource_onboarding)
      .filter(row => row.get("レース番号") === this.convert_race_number())
      .select("開催月日", "競馬場コード", "馬名")
    },
    show_horse_table(){
      let horse_data = this.filter_df()
      this.headers = header_bulid(horse_data.listColumns())
      this.items = horse_data.toCollection()
    }
  }
}


</script>