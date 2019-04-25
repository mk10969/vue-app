<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
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
      <v-tabs 
        grow
        v-model="date_onboarding"
        slider-color="black"
      >
          <v-tab
            v-for="date in dates"
            :key="date"
            :href="'#tab-' + date"
            @click="click2()"
          >
            {{ date }}
          </v-tab>
      </v-tabs>

      <!-- 開催競馬場 -->
      <v-tabs 
        grow
        v-model="cource_onboarding"
        slider-color="black"
      >
          <v-tab
            v-for="i in cource_list"
            :key="i"
            :href="'#tab-' + i"
            @click="click2()"
          >
            {{ get_race_name(i) }}
          </v-tab>
      </v-tabs>
      </v-card>

      <!-- レース番号 -->
      <once :racing_data="get_racing_data()"></once>
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
  import once from './once.vue'

  // import window from './test_window.vue'
  
  export default {
    components: {
      once
    },
    data: () => ({
      // 下記は、一旦。
      race_code: {
        "01": "札幌", "02": "函館", "03": "福島", "04": "新潟", "05": "東京", "06": "中山", "07": "中京", "08": "京都", "09": "阪神", "10": "小倉"
      },
      data_code: {
        "1": "土", "2": "日", "3": "祝日", "4": "月", "5": "火", "6": "水", "7": "木", "8": "金"
      },

      date_onboarding: null,
      cource_onboarding: null,

      df: null,
      year: null,
      dates: null,
      cource_list: null,
    }),

    // watch: {
    //   data: {
    //     handler (newVal, oldVal) {
    //       console.log(`更新前のネストされたデータ：${oldVal.nestedData}`)
    //       console.log(`更新後のネストされたデータ：${newVal.nestedData}`)
    //     },
    //     deep: true
    //     }
    // },

    created() {
        this.$http
        .get('http://127.0.0.1:5000/tw/RACE/RA/')
        .then(response => {
          console.log(response)
          this.df = new DataFrame(response.data.items, response.data.header)
          
          this.year = this.df.unique("開催年").toArray("開催年").toString()
          this.dates = this.df.unique("開催月日").toArray("開催月日")
          this.cource_list = this.df.unique("競馬場コード").toArray("競馬場コード")
        })

        
    },
    methods: {
      next () {
        this.onboarding = this.onboarding + 1 === this.cource_list
          ? 0
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 < 0
          ? this.cource_list - 1
          : this.onboarding - 1
      },
      get_racing_date(year, date){
        return moment(year + date, "YYYYMMDD").format('YYYY年MM月DD日')
      },
      get_race_name(number){
        return this.race_code[number]
      },
      get_racing_data(){
        return {
          "racing_date": this.date_onboarding,
          "cource": this.cource_onboarding,
        }
      },
      click () {
        console.log(this.df)
      },
      click2 () {
        console.log(this.date_onboarding)
        console.log(this.cource_onboarding)
        
      },
    }
  }
</script>