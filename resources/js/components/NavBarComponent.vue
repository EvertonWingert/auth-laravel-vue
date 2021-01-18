
<template>
  <header v-if="isAuth">
    <div
      class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show"
      id="sidebar"
    >
      <div class="c-sidebar-brand d-md-down-none">Dashboard</div>
      <ul class="c-sidebar-nav ps ps--active-y">
        <li class="c-sidebar-nav-item">
          <router-link to="/">
            <a class="c-sidebar-nav-link">Dashboard</a>
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link to="/">
            <a class="c-sidebar-nav-link">Evento</a>
          </router-link>
        </li>
      </ul>

      <a class="p-2" v-if="isAuth" @click="logout">Logout</a>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.state.login;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser").then((_) => {
        this.$router.push({ name: "entrada" });
      });
    },
  },

};
</script>
