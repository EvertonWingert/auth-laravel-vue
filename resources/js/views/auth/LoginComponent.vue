<template>
  <div class="container d-flex justify-content-center align-content-center flex-column" style="height: 100vh">
    <loading-component v-if="loading"></loading-component>
    <div class="card rounded shadow ">
      <div class="card-header">Login</div>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              >Email</label
            >
            <div class="col-6">
              <input
                type="email"
                class="form-control"
                v-model="formData.email"
                id="inputEmail"
                :class="{ 'is-invalid': $v.formData.email.$error }"
                @change="$v.formData.email.$touch()"
              />
              <div v-if="$v.formData.email.$error" class="invalid-feedback">
                Este campo é requerido.
              </div>
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label"
              >Password</label
            >
            <div class="col-6">
              <input
                type="password"
                class="form-control"
                v-model="formData.password"
                id="inputPassword"
                :class="{ 'is-invalid': $v.formData.password.$error }"
                @change="$v.formData.password.$touch()"
              />
              <div v-if="$v.formData.password.$error" class="invalid-feedback">
                Este campo é requerido.
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingComponent from "../../components/LoadingComponent";
import { required } from "vuelidate/lib/validators";
import { api } from "../../services";

export default {
  components: {
    LoadingComponent,
  },
  data() {
    return {
      formData: {
        email: null,
        password: null,
      },
      response: [],
      loading: false,
      serverError: false,
    };
  },
  validations: {
    formData: {
      email: { required },
      password: { required },
    },
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        this.response = await api.post("/login", this.formData);
        if (this.response.data["status_code"] == 200) {
          this.$store.commit("UPDATE_LOGIN", true);
          $cookies.set("token", this.response.data.token);
          this.$router.push("/home");
        } else {
          console.log(this.response.data.message);
          console.log("Erro");
        }
      } catch (e) {
        console.log(e);
        console.log(this.response);
        this.serverError = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
