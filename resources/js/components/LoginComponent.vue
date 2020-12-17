<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body">
      <p v-if="errors.length">
    <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
    <ul>
      <li v-for="(error,index) in errors" :key="index">
        <div class="alert alert-danger" role="alert">
 {{error}}
</div>
      </li>
    </ul>
  </p>
        <form @submit.prevent="Logar">
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              >Email</label
            >
            <div class="col-sm-6">
              <input
                type="email"
                class="form-control"
                v-model="email"
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
                v-model="password"
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
import ErroNotificacao from "./ErroNotificacao.vue";
const { validationMixin, default: Vuelidate } = require("vuelidate");
const { required, minLength } = require("vuelidate/lib/validators");

export default {
  components: { ErroNotificacao },
  data() {
    return {
      errors: [],
      email: null,
      password: null,
    };
  },
  methods: {
    checkForm() {
      if (this.email == null) {
        this.errors.push("Digite um email");
      }
      if (this.password == null) {
        this.errors.push("Digite uma senha");
      }
    },
    Logar() {
      //Validar dados
      this.checkForm();

      this.$store
        .dispatch("loginUser", { email: this.email, password: this.password })
        .then((response) => {
          console.log(response.data.message);
          this.erro = true;
          //this.erroMessage = response.data.message;
          //this.$router.push("/home");
        });
    },
  },
};
</script>
