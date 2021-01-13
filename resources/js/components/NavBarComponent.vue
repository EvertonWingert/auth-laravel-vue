
<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-ligth bg-light shadow">
      <div class="container">
        <router-link to="/"
          ><a class="navbar-brand text-reset" href="#">Navbar</a></router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div v-if="!isConnected" class="navbar-nav">
            <router-link class="text-reset" to="/">
              <a class="nav-link">Home</a>
            </router-link>
          </div>
          <div v-else class="navbar-nav">
            <router-link to="/evento">
              <a class="nav-link text-reset">Evento</a>
            </router-link>
          </div>
        </div>
        <div class="navbar-nav" v-if="isConnected">
          <a class="nav-link" v-if="isConnected" @click="logout">Logout</a>
        </div>
        <div class="navbar-nav" v-else>
          <router-link class="text-reset" v-show="!isConnected" to="/register"
            ><a class="nav-link">Register</a></router-link
          >
          <router-link class="text-reset" v-show="!isConnected" to="/login"
            ><a class="nav-link">Login</a></router-link
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isConnected() {
      return this.$store.state.login;
    },
  },
  methods: {
    logout() {
      this.$store.commit("UPDATE_LOGIN", false);
      $cookies.remove("token");
      this.$router.push({ name: "entrada" });
    },
  },
};
</script>
