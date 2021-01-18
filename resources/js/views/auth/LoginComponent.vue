<template>
  <div class="d-flex align-items-center" style="height: 100vh">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-5 col-xl-4 my-5">
          <h1 class=" text-center mb-3">Login</h1>
          <loading-component v-if="loading"></loading-component>
          <flash-message-component
            v-if="message.type"
            :message="message"
          ></flash-message-component>
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
                :class="{ 'is-invalid': $v.formData.email.$error }"
                @change="$v.formData.email.$touch()"
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
                  id="inputPassword"
                  :class="{ 'is-invalid': $v.formData.password.$error }"
                  @change="$v.formData.password.$touch()"
                  autocomplete="password"
                  required
                />
                <div
                  v-if="$v.formData.password.$error"
                  class="invalid-feedback"
                >
                  Este campo é requerido.
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
</template>

<script>
import LoadingComponent from "../../components/LoadingComponent";
import { required, minLength, email } from "vuelidate/lib/validators";
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
      email: { required, email },
      password: { required, minLength: minLength(8) },
    },
  },
  methods: {
    login() {
      this.$store.dispatch("loginUser", this.formData).then((_) => {
        if (this.$store.state.login) {
          this.$router.push({ name: "evento" });
        } else {
          console.log(this.$store.state.error.data.errors.email[0]);
          
          this.flashMessage(
            "danger",
            this.$store.state.error.data.errors.email[0]
          );
          
        }
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
  mounted() {
    this.$store.commit("UPDATE_ERROR", null);
  },
};
</script>
