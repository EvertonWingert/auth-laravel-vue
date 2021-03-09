<template>
  <div class="container">
    <div class="table-responsive mt-5 card rounded shadow p-3">
      <form class="row p-3 justify-content-center">
        <input
          v-model="search"
          class="col-6 form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
      <router-link v-if="isAuth" :to="{ name: 'createEvent' }">
        <button class="btn btn-primary">Criar evento</button>
      </router-link>
      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <table v-else class="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NOME</th>
            <th scope="col">DATA</th>
            <th scope="col">DESCRIÇÃO</th>
            <th v-if="isAuth" scope="col">AÇÕES</th>
          </tr>
        </thead>
        <tbody v-for="data in filteredList" :key="data.id">
          <tr>
            <th scope="row">{{ data.id }}</th>
            <td>{{ data.name }}</td>
            <td>{{ data.date }}</td>
            <td>{{ data.desc }}</td>
            <div v-if="isAuth">
              <td>
                <router-link
                  class="text-reset"
                  :to="{ name: 'editEvent', params: { id: data.id } }"
                >
                  <i class="fas fa-edit"></i>
                </router-link>
              </td>
              <td>
                <i
                  @click.prevent="deleteEvent(data.id)"
                  class="fas fa-trash"
                ></i>
              </td>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: {
    loading() {
      return this.$store.state.isLoading;
    },
    error() {
      return this.$store.state.error;
    },
    table() {
      return this.$store.state.table;
    },
    filteredList() {
      return this.table.filter((data) => {
        return data.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },

    isAuth() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch("readTable");
    },
    deleteEvent(id) {
      this.$store.dispatch("deleteTable", id).then((_) => {
        this.fetchData();
      });
    },
  },
  created() {
    this.fetchData();
    this.$store.commit("UPDATE_ERROR", null);
  },
};
</script>
