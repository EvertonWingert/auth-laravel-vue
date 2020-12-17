
<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
         <router-link to="/"><a class="navbar-brand" href="#">Navbar</a></router-link>
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
          <div class="navbar-nav">
            <router-link to="/home"><a class="nav-link">Home</a></router-link>
            <router-link to="/register"
              ><a class="nav-link">Register</a></router-link
            >
            <router-link to="/login"><a class="nav-link">Login</a></router-link>
            <a class="nav-link" @click="logout">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
        //passar token
        axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post("/api/logout", this.formData).then((response) => {
          this.$router.push("/register");
        });
      });
    },
  },
};
</script>
