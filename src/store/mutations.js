// https://vuex.vuejs.org/en/mutations.html

export default {
  changeleftDrawer(){
    console.log(this.state.leftDrawer)
    this.state.leftDrawer = ! this.state.leftDrawer
  },
  changeleftMiniVariant(){
    console.log(this.state.leftMiniVariant)
    this.state.leftMiniVariant = ! this.state.leftMiniVariant
  }
}