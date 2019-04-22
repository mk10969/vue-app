<template>
    
  <v-card
    color="white"
    flat
    tile
  >
  <div class="text-xs-center">
    <v-btn round color="primary" dark @click="click">df_show</v-btn>
  </div>
  <div class="text-xs-center">
    <v-btn round color="primary" dark @click="click2">df_show_selct</v-btn>
  </div>

  <!-- 開催日 -->
  <v-btn-toggle v-model="horse_racing_held" mandatory>
    <v-btn
      round
      v-for="(date, index) in horse_racing_held_list" :key="index"
      :value="date"
      @click="click3"
    >
      {{ year }} 年{{ date }}
    </v-btn>
  </v-btn-toggle>

  <!-- 開催競馬場 -->
  <v-card-actions class="justify-space-between">
    <v-spacer></v-spacer>
    <v-item-group
      v-model="onboarding"
      class="text-xs-center"
      mandatory
    >
      <v-item
        v-for="n in racecourse_code_list"
        :key="`btn-${n}`"
      >
        <v-btn
          slot-scope="{ active, toggle }"
          :input-value="active"
          flat
          round
          large
          @click="toggle"
        >
          {{ race_code[n] }}
        </v-btn>
      </v-item>
    </v-item-group>
    <v-spacer></v-spacer>
  </v-card-actions>

  <!-- レース番号 -->
  <v-card-actions class="justify-space-between">
    <v-btn flat @click="prev">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-item-group
      v-model="onboarding"
      class="text-xs-center"
      mandatory
    >
      <v-item
        v-for="n in racecourse_code_list"
        :key="`btn-${n}`"
      >
        <v-btn
          slot-scope="{ active, toggle }"
          :input-value="active"
          flat
          round
          @click="toggle"
        >
          {{ race_code[n] }}
        </v-btn>
      </v-item>
    </v-item-group>
    <v-btn flat @click="next">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-card-actions>



  <v-window v-model="onboarding">
    <v-window-item
      v-for="n in racecourse_code_list"
      :key="`card-${n}`"
    >
    <v-card>
      <v-card-title>
        {{ `card-${n}` }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    
        <!-- <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :rows-per-page-items="[20]"
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
        </v-data-table> -->
    </v-card>
    </v-window-item>
  </v-window>
  </v-card>
</template>

<script>
  import DataFrame from "dataframe-js";
  
  export default {
    data: () => ({
      // 下記は、一旦。
      race_code: {
        "01": "札幌", "02": "函館", "03": "福島", "04": "新潟", "05": "東京", "06": "中山", "07": "中京", "08": "京都", "09": "阪神", "10": "小倉"
      },
      search: "",
      onboarding: 0,
      df: null,
      year: null,
      horse_racing_held: null,
      horse_racing_held_list: null,
      racecourse_code_list: null,

      

    }),
    created() {
        this.$http
        .get('http://127.0.0.1:5050/tw/race_ra')
        .then(response => {
          console.log(response)
          this.df = new DataFrame(response.data.items, response.data.header)
          
          this.year = this.df.unique("開催年").toArray("開催年")
          this.horse_racing_held_list = this.df.unique("開催月日").toArray("開催月日")
          this.racecourse_code_list = this.df.unique("競馬場コード").toArray("競馬場コード")
          this.horse_racing_held = this.horse_racing_held_list[0]
        })
    },
    methods: {
      next () {
        this.onboarding = this.onboarding + 1 === this.racecourse_code_list
          ? 0
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 < 0
          ? this.racecourse_code_list - 1
          : this.onboarding - 1
      },
      click () {
        console.log(this.df)
      },
      click2 () {
        console.log()
        console.log(this.horse_racing_held_list),
        console.log(this.racecourse_code_list)
      },
      click3() {
        console.log(this.horse_racing_held)
      },
    }
  }
</script>