<template>
  <!-- レーズ番号 -->
  <v-card >
    <v-item-group v-model="race_onboarding" mandatory>
      <v-item v-for="n in 12" :key="`btn-${n}`">
        <v-btn
          slot-scope="{ active, toggle }"
          :input-value="active"
          flat
          round
          :value="n"
          @click="toggle(); click()"
        >
          {{ n }}R
        </v-btn>
      </v-item>
    </v-item-group>

    <v-window v-model="race_onboarding">
      <v-window-item 
        v-for="n in 12"
        :key="`card-${n}`"
        :value="n"
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
            <!-- 出走馬一覧 -->
            <!-- レース番号は、表示は、1~12だが、裏の値（race_onboarding）は、0~11 -->
            <RacingTable ></RacingTable>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>

</template>
<script>

import RacingTable from './RacingTable.vue'

export default {
  components: {
      RacingTable
    },
  props: {
    racing_data: Object,
  },

  data: function() {
    return {
      race_onboarding: null,
      //12Rがないときは、年に２度くらい。。一旦このままで。
      //race_list: [1,2,3,4,5,6,7,8,9,10,11,12],
      search: '',
      step: null
    }
  },
  methods: {
    click() {
      console.log(this.racing_data, this.race_onboarding)
    },
    click1() {
      console.log(this.step)
    }
  }
}
</script>