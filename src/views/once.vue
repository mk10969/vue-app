<template>
  <!-- レーズ番号 -->
  <v-card >
    <v-item-group v-model="race_onboarding" mandatory>
      <v-item v-for="n in race_list" :key="`btn-${n}`">
        <v-btn
          slot-scope="{ active, toggle }"
          :input-value="active"
          flat
          round
          @click="toggle(); click()"
        >
          {{ n }}R
        </v-btn>
      </v-item>
    </v-item-group>

    <v-window v-model="race_onboarding">
      <v-window-item v-for="n in race_list" :key="`card-${n}`">
        
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


export default {
  props: {
    racing_data: Object,
  },
    // created: () => {
    //   console.log(this.message)
    // }
  data: function() {
    return {
      race_onboarding: null,
      //12Rがないときは、年に２度くらい。。一旦このままで。
      race_list: [1,2,3,4,5,6,7,8,9,10,11,12],
      search: '',
    }
  },
  methods: {
    click() {
      console.log(this.racing_data, this.race_onboarding + "R")
    }
  }
}
</script>