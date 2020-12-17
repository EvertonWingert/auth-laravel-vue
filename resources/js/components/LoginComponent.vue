<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body">
        <form>
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              >Email</label
            >
            <div class="col-sm-6">
              <input
                type="email"
                class="form-control"
                v-model="formData.email"
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
                v-model="formData.password"
                id="inputPassword"
              />
            </div>
          </div>
          <button  @click.prevent="Logar" type="submit" class="btn btn-primary">Enviar</button>
          <h1 v-if="erro">{{erroMessage}}</h1>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ErroNotificacao from './ErroNotificacao.vue';
const { validationMixin, default: Vuelidate } = require('vuelidate')
const { required, minLength } = require('vuelidate/lib/validators')



export default {
  components: { ErroNotificacao },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      erro: [],
    };
  },
  methods: {
     Logar() {
      this.$store.dispatch("loginUser",this.formData).then(response =>{
        console.log(response.data.message);
        this.erro = true;
        this.erroMessage = response.data.message;
        //this.$router.push("/home");
      });
    },
  },
};
</script>
