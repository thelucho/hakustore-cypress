<template>
  <div id="app">
    <div class="container">
      <nav class="navbar navbar-expand">
        <a class="navbar-brand">Hakuna</a>
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">
              <font-awesome-icon icon="home" /> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="currentUser" to="/manage" class="nav-link"
              >Manage</router-link
            >
          </li>
        </div>

        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="sign-in-alt" /> Login
            </router-link>
          </li>
        </div>

        <div v-if="currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" /> LogOut
            </a>
          </li>
        </div>
      </nav>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
a {
  color: #525252;
}

.navbar {
  padding: 0.5rem 0rem;
}

.navbar-brand {
  font-weight: 700;
}

.nav-item a {
  color: #2b4dab;
}
</style>
