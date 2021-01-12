<template>
  <div class="container">
    <h1 class="text-center py-5">Evento</h1>
      <router-link :to="{ name: 'createEvent' }">
        <button class="btn btn-primary">Criar evento</button>
      </router-link>
    <table-component></table-component>
  </div>
</template>

<script>
import TableComponent from "../components/TableComponent";

export default {
  components: { TableComponent },
};
</script>
