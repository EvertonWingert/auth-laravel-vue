<template>
  <div class="d-flex align-items-center" style="height: 100vh">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-5 col-xl-4 my-5">
          <h1 class="text-center mb-3">Register</h1>

          <div v-if="loading" class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else>
            <form @submit.prevent="register">
              <!-- Name -->
              <div class="form-group">
                <!-- Label -->
                <label>Name</label>

                <!-- Input -->
                <input
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      $v.formData.name.$error || error.hasOwnProperty('name'),
                  }"
                  v-model="formData.name"
                  @change="$v.formData.name.$touch()"
                  id="inputName"
                  autocomplete="name"
                  required
                />
                <div v-if="$v.formData.name.$error" class="invalid-feedback">
                  Este campo é requerido.
                </div>
                <div v-if="error" class="invalid-feedback">
                  <div v-for="(v, k) in error.name" :key="k" role="alert">
                    <p>{{ v }}</p>
                  </div>
                </div>
              </div>
              <!-- Email address -->
              <div class="form-group">
                <!-- Label -->
                <label>Email Address</label>

                <!-- Input -->
                <input
                  type="email"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      $v.formData.email.$error || error.hasOwnProperty('email'),
                  }"
                  v-model="formData.email"
                  @change="$v.formData.email.$touch()"
                  id="inputEmail"
                  autocomplete="email"
                  required
                />
                <div v-if="$v.formData.email.$error" class="invalid-feedback">
                  Digite um email valido
                </div>
                <div v-if="error" class="invalid-feedback">
                  <div v-for="(v, k) in error.email" :key="k" role="alert">
                    <p>{{ v }}</p>
                  </div>
                </div>
              </div>

              <!-- Password -->
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <!-- Label -->
                    <label>Password</label>
                  </div>
                </div>
                <!-- / .row -->

                <!-- Input group -->
                <div class="input-group input-group-merge">
                  <!-- Input -->
                  <input
                    type="password"
                    class="form-control"
                    v-model="formData.password"
                    :class="{
                      'is-invalid':
                        $v.formData.password.$error ||
                        error.hasOwnProperty('password'),
                    }"
                    @change="$v.formData.password.$touch()"
                    id="inputPassword"
                    autocomplete="new-password"
                    required
                  />

                  <div v-if="$v.formData.email.$error" class="invalid-feedback">
                    Este campo precisa ter 8 digitos
                  </div>
                  <div v-if="error" class="invalid-feedback">
                    <div v-for="(v, k) in error.password" :key="k" role="alert">
                      <p>{{ v }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Submit -->
              <button class="btn btn-lg btn-block btn-primary mb-3">
                Registrar
              </button>

              <!-- Link -->
              <div class="text-center">
                <small class="text-muted text-center">
                  Já tem uma conta?
                  <router-link to="login"><a>Login</a></router-link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      formData: {
        name: null,
        email: null,
        password: null,
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.isLoading;
    },
    error() {
      return this.$store.state.error;
    },
  },
  validations: {
    formData: {
      name: { required },
      email: { required },
      password: { required, minLength: minLength(8) },
    },
  },
  methods: {
    register() {
      if (!this.$v.$invalid) {
        this.$store.dispatch("registerUser", this.formData);
      } else {
        this.$v.$touch();
      }
    },
  },
  created() {
    this.$store.commit("UPDATE_LOGIN", false);
    this.$store.commit("UPDATE_ERROR", []);
  },
};
</script>
