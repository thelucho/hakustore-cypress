<template>
  <div class="">
    <nav data-cy="navbar" class="navbar navbar-expand">
      <a class="navbar-brand">Hakuna</a>
      <div data-cy="menu" class="navbar-nav mr-auto">
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
          <router-link to="/login" data-cy="login-link" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" data-cy="logout-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
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