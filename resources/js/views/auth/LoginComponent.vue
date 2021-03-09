<template>
  <div class="d-flex align-items-center" style="height: 100vh">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-5 col-xl-4 my-5">
          <h1 class="text-center mb-3">Login</h1>

          <div v-if="loading" class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else>
            <form @submit.prevent="login">
              <!-- Email address -->
              <div class="form-group">
                <!-- Label -->
                <label>Email Address</label>

                <!-- Input -->
                <input
                  type="email"
                  class="form-control"
                  v-model="formData.email"
                  id="inputEmail"
                  :class="{
                    'is-invalid':
                      $v.formData.email.$error || (error && error.email),
                  }"
                  @change="$v.formData.email.$touch()"
                  autocomplete="email"
                  required
                />
                <div v-if="$v.formData.email.$error" class="invalid-feedback">
                  Digite um email valido
                </div>
                <div>
                  {{ error }}
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
                    id="inputPassword"
                    :class="{
                      'is-invalid':
                        $v.formData.password.$error || (error && error.email),
                    }"
                    @change="$v.formData.password.$touch()"
                    autocomplete="password"
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

                  <!-- Icon -->
                </div>
              </div>

              <!-- Submit -->
              <button class="btn btn-lg btn-block btn-primary mb-3">
                Sign in
              </button>

              <!-- Link -->
              <div class="text-center">
                <small class="text-muted text-center">
                  Não tem uma conta ainda?
                  <router-link to="register"><a>Registrar</a>.</router-link>
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
import Swal from "sweetalert2";

export default {
  data() {
    return {
      formData: {
        email: null,
        password: null,
      },
    };
  },

  validations: {
    formData: {
      email: { required, email },
      password: { required, minLength: minLength(8) },
    },
  },
  computed: {
    loading() {
      return this.$store.state.isLoading;
    },
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    login() {
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("loginUser", this.formData)

          .catch((resp) => {
            console.log(this.error);
          });
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
