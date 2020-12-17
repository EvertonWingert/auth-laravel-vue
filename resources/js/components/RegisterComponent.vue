<template>
  <div class="container ">
    <div class="card">
      <div class="card-header">Register</div>
      <div class="card-body">
        <form >
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              >Name</label
            >
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                v-model="formData.name"
                id="inputName"
              />
            </div>
          </div>
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
          <button @click.prevent="Register" type="submit" class="btn btn-primary">Enviar</button>
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
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    Register() {
      this.$store.dispatch("loginUser",this.formData);
      //this.$router.push('/home');
    },
  },
};
</script>
