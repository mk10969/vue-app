<template>
  <v-app>
    <!-- Header -->
    <v-toolbar
      app
      prominent
      >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
    </v-toolbar>

    <!-- Sidebar -->
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant="mini"
      absolute
      floating
      width="260px"
      mobile-break-point="991"    
    >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        tag="v-list"
        column
      >
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon> 
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              :src="logo"
              height="40"
            />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="title">
              Uma
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        
        <v-divider light></v-divider>
        
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="link.text"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-layout>
    </v-img>
    </v-navigation-drawer>

    <!-- Content -->
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
export default {
  data (){
    return {
      title: null,
      drawer: true,
      mini: false,
      logo: "https://cdn.netkeiba.com/img.news/?pid=news_img&id=100645",
 
      links: [
        {
          to: '/dashboard',
          icon: 'mdi-view-dashboard',
          text: 'Dashboard'
        },
        {
          to: '/user-profile',
          icon: 'mdi-account',
          text: 'User Profile'
        },
        {
          to: '/table-list',
          icon: 'mdi-clipboard-outline',
          text: 'Table List'
        },
        {
          to: '/typography',
          icon: 'mdi-format-font',
          text: 'Typography'
        },
        {
          to: '/icons',
          icon: 'mdi-chart-bubble',
          text: 'Icons'
        },
        {
          to: '/maps',
          icon: 'mdi-map-marker',
          text: 'Maps'
        },
        {
          to: '/notifications',
          icon: 'mdi-bell',
          text: 'Notifications'
        }
      ]
    }
  },

  watch: {
    '$route' (val) {
      this.title = val.name
    }
  }
}
</script>
