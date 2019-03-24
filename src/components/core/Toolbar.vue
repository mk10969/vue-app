<template>
<v-toolbar 
  id="core-toolbar"
  app
  prominent
  style="background: #eee;"
  >
  <v-toolbar-side-icon 
    @click.stop="onClickBtn">
  </v-toolbar-side-icon>
  <v-spacer/>
  <v-list-tile-avatar
    color="white"
    >
    <v-img
    :src="logo"
    height="50"
    contain
    />
  </v-list-tile-avatar>
  <v-toolbar-title>
    お馬さん
  </v-toolbar-title> 
  <v-spacer/>
</v-toolbar>
</template>

<script>
import {
  mapMutations
} from 'vuex'

export default {
  data: () => ({
    logo: `https://cdn.netkeiba.com/img.news/?pid=news_img&id=100645`,
  }),

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    }
  }
}
</script>
