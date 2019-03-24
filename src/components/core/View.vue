<template>
  <v-content>
    <div id="core-view">
      <!-- <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition> -->
      <v-container>
        <router-view />
      </v-container>
    </div>
  </v-content>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: 'Vuetify Material Dashboard by CreativeTim'
    }
  }
}
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
