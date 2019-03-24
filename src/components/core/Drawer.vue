<template>
  <v-navigation-drawer
    app
    id="app-drawer"
    v-model="drawer"
    absolute
    :mini-variant="mini"
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        tag="v-list"
        column
      >
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
          <v-list-tile-title
            v-text="link.text"
          />
          </v-list-tile-content>
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    mini: false,
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
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
    }
  }
}
</script>

// <style lang="scss">
//   #app-drawer {
//     .v-list__tile {
//       border-radius: 4px;

//       &--buy {
//         margin-top: auto;
//         margin-bottom: 17px;
//       }
//     }

//     .v-image__image--contain {
//       top: 9px;
//       height: 60%;
//     }

//     .search-input {
//       margin-bottom: 30px !important;
//       padding-left: 15px;
//       padding-right: 15px;
//     }
//   }
// </style>
