<template>
  <div class="container">
    <loading-component v-if="loading"></loading-component>
    <div class="table-responsive mt-5">
      <h1 v-if="error != false">{{this.error}}</h1>
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
              <i @click.prevent="deleteEvent(data.id)" class="fas fa-trash"></i>
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
  computed: {
    loading() {
      return this.$store.state.isLoading;
    },
    tableData() {
      return this.$store.state.table;
    },
    error(){
      return this.$store.state.error;
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch("readTable");
    },
    async deleteEvent(id) {
      this.$store.dispatch("deleteTable", id).then( response =>{
        this.fetchData();
      })
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
