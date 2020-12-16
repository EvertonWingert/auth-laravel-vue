<template>
  <div class="container ">
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body">
        <form action="#" @submit.prevent="Register">
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
        name: "",
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    Register(e) {
      (this.loading = true), e.preventDefault();
      axios.get("/sanctum/csrf-cookie").then((response) => {
        axios
          .post("/api/register", this.formData)
          .then((response) => {
            console.log(response);
            this.$router.push('/home')
          });
      });
      this.loading = false;
    },
  },
};
</script>
