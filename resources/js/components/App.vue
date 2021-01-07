<template>
  <div>
    <navbar />
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    validateLogin() {
      if ($cookies.get("token")) {
        this.$store.commit("UPDATE_LOGIN", true);
        //Loga usuario
        //this.$store.dispatch("getUsuario");
      }
    },
  },
  created() {
    this.validateLogin();
  },
};
</script>

<style>
</style>