<template>
  <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :rows-per-page-items="[20, 50, 100]"
      class=""
    >
      <!-- support -->
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
      <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>

      <!-- make Table -->
      <template slot="items" slot-scope="props">
        <tr @click="cmdpush(props)">
          <td v-for="(column, index) in headers" :key="index">
            {{ props.item[column] }}
          </td>
          </tr>
      </template>
    </v-data-table>

  </v-card>
</template>

<script>
import axios from 'axios';
  export default {
    data () {
      return {
        search: '',
        headers: [],
        items: []
      }
    },
    mounted (){
      axios
        .get('http://127.0.0.1:5050/test')
        .then(response => {
          this.headers = response.data.headers
          this.items = response.data.items
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          console.log('finished !')
        })
    }
  }
</script>