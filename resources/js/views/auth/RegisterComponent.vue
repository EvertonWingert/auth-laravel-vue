<template>
  <div class="d-flex align-items-center" style="height: 100vh">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-5 col-xl-4 my-5">
          <div v-if="error">
            <div
              v-for="(v, k) in error"
              :key="k"
              class="alert alert-danger"
              role="alert"
            >
              <p>{{ v[0] }}</p>
            </div>
          </div>
          <h1 class="text-center mb-3">Register</h1>
          <loading-component v-if="loading"></loading-component>

          <form @submit.prevent="register">
            <!-- Name -->
            <div class="form-group">
              <!-- Label -->
              <label>Name</label>

              <!-- Input -->
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': $v.formData.name.$error }"
                v-model="formData.name"
                @change="$v.formData.name.$touch()"
                id="inputName"
                autocomplete="name"
                required
              />
              <div v-if="$v.formData.name.$error" class="invalid-feedback">
                Este campo é requerido.
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
                :class="{ 'is-invalid': $v.formData.email.$error }"
                v-model="formData.email"
                @change="$v.formData.email.$touch()"
                id="inputEmail"
                autocomplete="email"
                required
              />
              <div v-if="$v.formData.email.$error" class="invalid-feedback">
                Este campo é requerido.
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
                  :class="{ 'is-invalid': $v.formData.password.$error }"
                  @change="$v.formData.password.$touch()"
                  id="inputPassword"
                  autocomplete="new-password"
                  required
                />
                <div
                  v-if="$v.formData.password.$error"
                  class="invalid-feedback"
                >
                  Este campo é requerido.
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
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import LoadingComponent from "../../components/LoadingComponent";
import FlashMessageComponent from "../../components/FlashMessageComponent.vue";

import { api } from "../../services";

export default {
  components: { LoadingComponent, FlashMessageComponent },
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
      name: { required, minLength: minLength(3) },
      email: { required, email },
      password: { required, minLength: minLength(8) },
    },
  },
  methods: {
    register() {
      if (!this.$v.$invalid) {
        this.$store.dispatch("registerUser", this.formData).then((_) => {
          if (this.$store.state.login) {
            this.$router.push({ name: "evento" });
          }
        });
      } else {
        this.$v.$touch();
      }
    },
  },
  mounted() {
    this.$store.commit("UPDATE_ERROR", null);
  },
};
</script>
