<template>
  <div class="container">
    <loading-component v-if="loading"></loading-component>

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
            placeholder="Desc"
            :class="{ 'is-invalid': $v.formData.desc.$error }"
          />
          <div v-if="$v.formData.desc.$error" class="invalid-feedback">
            Este campo é requerido.
          </div>
        </div>
        <div class="col">
          <button
            v-if="!editar"
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
      loading: false,
      edit: false,
      search: "",
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
    getData() {
      this.loading = true;
      this.$store.dispatch("getTable").then((response) => {
        this.loading = false;
      });
    },

    inverter() {
      this.$store.commit(
        "UPDATE_TABLE_ORDER",
        !this.$store.state.tableOrderCresc
      );
      this.$store.commit("UPDATE_TABLE", this.$store.state.table.reverse());
    },
    saveData() {
      if (!this.$v.$invalid) {
        this.$store.dispatch("saveTable", this.formData).then((response) => {
          this.getData();
          this.clearInputForm();
        });
      } else {
        this.$v.$touch();
      }
    },
    editEvent(data) {
      this.editar = true;
      this.formData = data;
    },
    updateEvent() {
      if (!this.$v.$invalid) {
        this.$store.dispatch("updateTable", this.formData).then((response) => {
          this.getData();
          this.editar = false;
          this.clearInputForm();
        });
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
