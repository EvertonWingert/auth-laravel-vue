
<template>
  <header>
    <nav class=" navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <li class="nav-item">
              <router-link :to="{name: 'index'}">
              <a class="nav-link">Evento</a>
            </router-link>
            </li>
          </ul>
          <div v-if="isAuth">
            <a class="p-2" @click="logout">Logout</a>
          </div>
          <div v-else>
            <router-link :to="{ name: 'register' }">
              <a class="p-2">Register</a>
            </router-link>
            <router-link :to="{ name: 'login' }">
              <a class="p-2">Login</a>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    },
  },
};
</script>
