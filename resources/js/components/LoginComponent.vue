<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body">
        <form>
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              >Email</label
            >
            <div class="col-sm-6">
              <input
                type="email"
                class="form-control"
                v-model="formData.email"
                id="inputEmail"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label"
              >Password</label
            >
            <div class="col-sm-6">
              <input
                type="password"
                class="form-control"
                v-model="formData.password"
                id="inputPassword"
              />
            </div>
          </div>
          <button  @click.prevent="Logar" type="submit" class="btn btn-primary">Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    Logar() {
      //this.$store.commit("UPDATE_LOGIN", true);
      this.$store.dispatch("getUsuario",this.$store.state.usuario);
      console.log(this.formData);
      /*
      api.get("/sanctum/csrf-cookie").then((response) => {
        api.post("/api/login", this.formData).then((response) => {
          this.$router.push("/home");
        });
      });
      */
    },
  },
};
</script>
