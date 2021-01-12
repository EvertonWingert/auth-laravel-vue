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
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">Edit event</h5>
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
                @click.prevent="updateEvent()"
                class="btn btn-warning"
                v-bind:disabled="loading"
              >
                Salvar
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
import { api } from "../../services";
import LoadingComponent from "../../components/LoadingComponent.vue";

export default {
  components: { LoadingComponent },
  props: ["id"],
  data() {
    return {
      formData: {
        id: null,
        name: null,
        date: null,
        desc: null,
      },
      message: {
        type: null,
        text: null,
      },
      response: [],
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
    tableData() {
      return this.$store.state.table;
    },
  },
  methods: {
    flashMessage(type, text) {
      this.message.type = type;
      this.message.text = text;
      setTimeout(() => (this.message = ""), 3000);
    },
    async updateEvent() {
      console.log(this.formData);
      if (!this.$v.$invalid) {
        this.$store.dispatch("updateTable", this.formData);

        /*
        this.loading = true;
        try {
          this.response = await api.put(`/evento/${this.id}`, this.formData);
          if (this.response.data["status_code"] == 200) {
            this.flashMessage("success", "Evento editado com sucesso");
          } else {
            this.flashMessage("warning", "Erro ao editar evento");
          }
        } catch (e) {
          this.flashMessage("danger", "Não foi possivel conectar ao servidor");

          console.log(e);
        } finally {
          this.loading = false;
        }
        */
      } else {
        this.$v.$touch();
      }
    },
    fetchData() {
      this.$store.dispatch("showTable", this.id).then(response =>{
        this.formData = response.data.dados;
      })
    },
    /*
    async getData() {
      this.loading = true;
      try {
        this.response = await api.get(`/evento/${this.id}`);
        if (this.response.data["status_code"] == 200) {
          this.formData = this.response.data.dados;
        } else {
          console.log(this.response);
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    */
  },

  mounted() {
    console.log(this.id);
    this.fetchData();

  },
};
</script>

<style>
</style>