<template>
  <div class="container">
    <h1 class=" py-5">Evento</h1>
      <router-view></router-view>
  </div>
</template>

<script>
import TableComponent from "../components/TableComponent";

export default {
  components: { TableComponent },
};
</script>
