<template>
  <div class="container">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>
    <div class="card">
      <div class="card-header">Register</div>
      <div class="card-body">
        <form>
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
                :class="{ 'is-invalid': $v.formData.password.$error }"
                v-model="formData.password"
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
            @click.prevent="Register"
            type="submit"
            class="btn btn-primary"
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
export default {
  data() {
    return {
      formData: {
        name: null,
        email: null,
        password: null,
      },
      loading: false,
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
    Register() {
      this.loading = true;
      if (!this.$v.$invalid) {
        this.$store.dispatch("registerUser", this.formData).then((response) => {
          if (response.data.status_code == 200) {
            this.$router.push("/evento");
          } else {
            console.log("Alguma coisa deu errada");
          }
          this.loading = false;
        });
      } else {
        this.$v.$touch();
        this.loading = false;
      }
    },
  },
};
</script>
