<template>
  <div
    class="container d-flex justify-content-center align-content-center flex-column"
    style="height: 100vh"
  >
    <loading-component v-if="loading"></loading-component>
    <flash-message-component
      v-if="message.type"
      :message="message"
    ></flash-message-component>
    <div class="card rounded shadow" style="max-with: 330px">
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
                autocomplete="email"
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
                autocomplete="password"
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
import LoadingComponent from "../../components/LoadingComponent";
import { required } from "vuelidate/lib/validators";
import { api } from "../../services";
import FlashMessageComponent from "../../components/FlashMessageComponent.vue";

export default {
  components: {
    LoadingComponent,
    FlashMessageComponent,
  },
  data() {
    return {
      formData: {
        email: null,
        password: null,
      },
      response: [],
      loading: false,
      message: {
        type: "",
        text: "",
      },
    };
  },

  validations: {
    formData: {
      email: { required },
      password: { required },
    },
  },
  methods: {
    login() {
      this.loading = true;

      api.get("/sanctum/csrf-cookie").then((_) => {
        api
          .post("/login", this.formData)
          .then((resp) => {
            this.$store.commit("UPDATE_LOGIN", true);
            $cookies.set("token", resp.data.token);
            this.$router.push({ name: "evento" });
          })
          .catch((err) => {
            console.log(err.response.data.errors);
          })
          .finally((_) => {
            this.loading = false;
          });
      });
    },
    flashMessage(type, text) {
      this.message.type = type;
      this.message.text = text;
      setTimeout(
        () => ((this.message.type = ""), (this.message.text = "")),
        3000
      );
    },
  },
};
</script>
