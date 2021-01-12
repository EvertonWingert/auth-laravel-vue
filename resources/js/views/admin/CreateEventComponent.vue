<template>
  <div
    class="container d-flex justify-content-center align-content-center flex-column"
    style="height: 100vh"
  >
    <loading-component v-if="loading"></loading-component>
    <div
      v-if="message.type"
      class="alert"
      v-bind:class="[
        message.type == 'success' ? 'alert-success' : 'alert-danger',
      ]"
      role="alert"
    >
      <p>{{ message.text }}</p>
    </div>
    <div class="card card rounded shadow p-3">
      <div class="card-body">
        <h5 class="card-title text-center">Create event</h5>

        <form>
          <div class="form">
            <div class="col-auto mb-3">
              <input
                type="text"
                v-model="formData.name"
                class="form-control"
                placeholder="Nome"
                :class="{ 'is-invalid': $v.formData.name.$error }"
              />
              <div v-if="$v.formData.name.$error" class="invalid-feedback">
                Este campo é requerido.
              </div>
            </div>
            <div class="col-auto mb-3">
              <input
                type="date"
                v-model="formData.date"
                class="form-control"
                placeholder="Data"
                max="9999-12-31"
                :class="{ 'is-invalid': $v.formData.date.$error }"
              />
              <div v-if="$v.formData.date.$error" class="invalid-feedback">
                Este campo é requerido.
              </div>
            </div>
            <div class="col-auto mb-3">
              <input
                type="text"
                v-model="formData.desc"
                class="form-control"
                placeholder="Descrição"
                :class="{ 'is-invalid': $v.formData.desc.$error }"
              />
              <div v-if="$v.formData.desc.$error" class="invalid-feedback">
                Este campo é requerido.
              </div>
            </div>
            <div class="col-auto mb-3">
              <button
                @click.prevent="saveData()"
                class="btn btn-primary"
                v-bind:disabled="loading"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import LoadingComponent from "../../components/LoadingComponent.vue";
import { api } from "../../services";
export default {
  components: { LoadingComponent },
  data() {
    return {
      formData: {
        id: null,
        name: null,
        date: null,
        desc: null,
      },
      message: {
        type: "",
        text: "",
      },
    };
  },
  validations: {
    formData: {
      name: { required },
      date: { required },
      desc: { required },
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
    saveData() {
      if (!this.$v.$invalid) {
        this.$store.dispatch("createTable", this.formData).then((_) => {
          this.flashMessage(
            this.error ? "error" : "success",
            this.error ? "Erro ao criar" : "Criado com sucesso"
          );
        });
      } else {
        this.$v.$touch();
      }
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

<style>
</style>