<template>
  <div id="app">
    <navigation-component></navigation-component>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import FooterComponent from '@/components/Footer'
import NavigationComponent from '@/components/Navigation'

export default {
  name: 'app',
  components: {
    FooterComponent,
    NavigationComponent
  }
}
</script>

<style lang="scss" scoped>

</style>
