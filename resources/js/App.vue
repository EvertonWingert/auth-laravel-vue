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
      if ($cookies.isKey("token")) {
        this.$store.commit("UPDATE_LOGIN", true);
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