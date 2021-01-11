<template>
  <div class="container d-flex justify-content-center align-content-center flex-column" style="height: 100vh">
    <loading-component v-if="loading"></loading-component>
    <div class="card ">
      <div class="card-header">Register</div>
      <div class="card-body">
        <form @submit.prevent="register">
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              >Name</label
            >
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': $v.formData.name.$error }"
                v-model="formData.name"
                @change="$v.formData.name.$touch()"
                id="inputName"
                required
              />
              <div v-if="$v.formData.name.$error" class="invalid-feedback">
                Este campo é requerido.
              </div>
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
                :class="{ 'is-invalid': $v.formData.email.$error }"
                v-model="formData.email"
                @change="$v.formData.email.$touch()"
                id="inputEmail"
                required
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
            <div class="col-sm-6">
              <input
                type="password"
                class="form-control"
                v-model="formData.password"
                :class="{ 'is-invalid': $v.formData.password.$error }"
                @change="$v.formData.password.$touch()"
                id="inputPassword"
                required
              />
              <div v-if="$v.formData.password.$error" class="invalid-feedback">
                Este campo é requerido.
              </div>
            </div>
          </div>
          <button

            type="submit"
            class="btn btn-primary btn-block"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import LoadingComponent from "../../components/LoadingComponent";
import { api } from "../../services";

export default {
  components: { LoadingComponent },
  data() {
    return {
      formData: {
        name: null,
        email: null,
        password: null,
      },
      loading: false,
      response: [],
      serverError: false,
    };
  },
  validations: {
    formData: {
      name: { required },
      email: { required },
      password: { required },
    },
  },
  methods: {
    async register() {
      this.loading = true;
      if (!this.$v.$invalid) {
        try {
          this.response = await api.post("/register", this.formData);
          if (this.response.data["status_code"] == 200) {
            this.$store.commit("UPDATE_LOGIN", true);
            console.log(this.response.data.token);
            $cookies.set("token", this.response.data.token);
            this.$router.push("/evento");
          } else {
            console.log("Erro");
          }
        } catch (e) {
          console.log(e);
          console.log(this.response);
        } finally {
          this.loading = false;
        }
      } else {
        this.$v.$touch();
      }
    },
  },
};
</script>
