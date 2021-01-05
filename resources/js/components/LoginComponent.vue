<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body">
        <form @submit.prevent="Logar">
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
                required
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
                required
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Enviar</button>
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
        email: null,
        password: null,
      },
    };
  },
  methods: {
    Logar() {

      this.$store
        .dispatch("loginUser", this.formData)
        .then((response) => {
          if(response.data.status_code == 200){
            this.$router.push("/home");
          }else{
            console.log("Alguma coisa deu errada");
          }          
        });
    },
  },
};
</script>
