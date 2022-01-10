<template>
  <div id="app">
    <div class="container">
      <navbar></navbar>
    </div>

    <router-view />
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';

export default {
  components: {
    Navbar
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>

<style scoped>
a {
  color: #525252;
}
</style>
