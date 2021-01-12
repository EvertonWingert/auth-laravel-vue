<template>
  <div class="container">
    <loading-component v-if="loading"></loading-component>
    <div v-if="serverError" class="alert alert-danger" role="alert">
      <p>Não foi possivel conectar-se ao servidor</p>
      <button type="button" class="btn btn-outline-danger" @click="getData()">
        Tentar novamente
      </button>
    </div>
    <div class="table-responsive mt-5">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NOME</th>
            <th scope="col">DATA</th>
            <th scope="col">DESCRIÇÃO</th>
          </tr>
        </thead>
        <tbody v-for="data in tableData" :key="data.id">
          <tr>
            <th scope="row">{{ data.id }}</th>
            <td>{{ data.name }}</td>
            <td>{{ data.date }}</td>
            <td>{{ data.desc }}</td>
            <td>
              <router-link :to="{ name: 'editEvent', params: { id: data.id } }">
                <i class="fas fa-edit"></i>
              </router-link>
            </td>
            <td>
              <i @click.prevent="editEvent(data.id)" class="fas fa-trash"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { api } from "../services";
import LoadingComponent from "./LoadingComponent.vue";

export default {
  components: { LoadingComponent },
  data() {
    return {
      search: "",
      response: [],
      serverError: false,
      responseErro: [],
    };
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
    fetchData() {
      this.$store.dispatch("readTable");
    },
    /*
      this.loading = true;
      try {
        this.response = await api.get("/evento");
        if (this.response.data["status_code"] == 200) {
          this.$store.commit(
            "UPDATE_TABLE",

            this.response.data.dados
          );
        } else {
          console.log(this.response);
        }
        this.serverError = false;
      } catch (e) {
        console.log(e);
        this.serverError = true;
      } finally {
        this.loading = false;
      }
      */

    async deleteEvent(id) {
      console.log(id);
      this.loading = true;
      try {
        this.response = await api.delete(`/evento/${id}`);
        if (this.response.data["status_code"] == 200) {
          this.getData();
        } else {
          console.log(this.response);
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
