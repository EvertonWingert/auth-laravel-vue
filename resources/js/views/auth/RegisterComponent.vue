<template>
  <div
    class="container d-flex justify-content-center align-content-center flex-column"
    style="height: 100vh"
  >
    <loading-component v-if="loading"></loading-component>
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

    <div class="card rounded shadow">
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
                autocomplete="name"
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
                autocomplete="email"
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
                autocomplete="new-password"
                required
              />
              <div v-if="$v.formData.password.$error" class="invalid-feedback">
                Este campo é requerido.
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-block">
            Enviar
          </button>
        </form>
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
