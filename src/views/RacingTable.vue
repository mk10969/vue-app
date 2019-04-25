<template>
    <!-- <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div> -->
    <v-data-table
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
    </v-data-table>
</template>

<script>
  export default {
    props: {
      horses_data: Object,
    },
    data: () => ({
      length: 3,
      window: 0
    }),
    methods: {
        click() {
            console.log(this.horses_data)
        }
    },
  }
</script>