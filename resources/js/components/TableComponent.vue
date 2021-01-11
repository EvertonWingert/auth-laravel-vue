<template>
  <div class="container">
    <loading-component v-if="loading"></loading-component>
    <div v-if="serverError" class="alert alert-danger" role="alert">
      <p>Não foi possivel conectar-se ao servidor</p>
      <button type="button" class="btn btn-outline-danger" @click="getData()">
        Tentar novamente
      </button>
    </div>
    <form>
      <div class="form-row">
        <div class="col">
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
        <div class="col">
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
        <div class="col">
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
        <div class="col">
          <button
            v-if="!edit"
            @click.prevent="saveData()"
            class="btn btn-primary btn-block"
            v-bind:disabled="loading"
          >
            Enviar
          </button>

          <button
            v-else
            @click.prevent="updateEvent()"
            class="btn btn-block btn-warning"
            v-bind:disabled="loading"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
    <div class="table-responsive mt-5">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NOME</th>
            <th scope="col">DATA</th>
            <th scope="col">DESC</th>
            <th scope="col">
              <button class="btn btn-success" @click.prevent="inverter()">
                Inverter
              </button>
            </th>
          </tr>
        </thead>
        <tbody v-for="data in $store.state.table" :key="data.id">
          <tr>
            <th scope="row">{{ data.id }}</th>
            <td>{{ data.name }}</td>
            <td>{{ data.date }}</td>
            <td>{{ data.desc }}</td>
            <td>
              <button @click.prevent="delEvent(data.id)" class="btn btn-danger">
                Deletar
              </button>
            </td>
            <td>
              <button @click.prevent="editEvent(data)" class="btn btn-warning">
                Editar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import LoadingComponent from "./LoadingComponent.vue";
import { api } from "../services";

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
      loading: false,
      edit: false,
      search: "",
      response: [],
      serverError: false,
      responseErro: [],
    };
  },
  validations: {
    formData: {
      name: { required },
      date: { required },
      desc: { required },
    },
  },
  methods: {
    async getData() {
      this.loading = true;
      try {
        this.response = await api.get("/evento");
        if (this.response.data["status_code"] == 200) {
          this.$store.commit(
            "UPDATE_TABLE",
            this.tableOrderCresc
              ? this.response.data.dados
              : this.response.data.dados.reverse()
          );
        } else {
          console.log(this.response);
        }
        this.serverError = false;
      } catch (e) {
        console.log(e);
        this.serverError = true;
        //this.responseErro = this.response.data;
      } finally {
        this.loading = false;
        this.clearInputForm();
      }
    },

    inverter() {
      this.$store.commit("UPDATE_TABLE", this.$store.state.table.reverse());
    },
    async saveData() {
      if (!this.$v.$invalid) {
        try {
          this.response = await api.post("/evento", this.formData);
          if (this.response.data["status_code"] == 200) {
            this.getData();
          } else {
            console.log(this.response);
          }
        } catch (e) {
          console.log(e);
          this.serverError = true;
          this.responseErro = this.response.data;
        }
      } else {
        this.$v.$touch();
      }
    },
    editEvent(data) {
      this.edit = true;
      this.formData = data;
    },
    flashMessage(type, text) {
      this.message.type = type;
      this.message.text = text;
      setTimeout(() => (this.message = ""), 1000);
    },
    async updateEvent() {
      if (!this.$v.$invalid) {
        try {
          this.response = await api.put(
            `/evento/${this.formData.id}`,
            this.formData
          );
          if (this.response.data["status_code"] == 200) {
            this.getData();
          } else {
            console.log(this.response);
          }
        } catch (e) {
          console.log(e);
          this.serverError = true;
        } finally {
          this.edit = false;
        }
      } else {
        this.$v.$touch();
      }
    },
    delEvent(id) {
      this.$store.dispatch("delTable", id).then((response) => {
        this.getData();
      });
    },
    clearInputForm() {
      this.formData.name = null;
      this.formData.date = null;
      this.formData.desc = null;
      this.$v.reset;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
