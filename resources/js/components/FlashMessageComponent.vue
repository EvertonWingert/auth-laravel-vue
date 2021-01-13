<template>
  <div
    class="alert"
    v-bind:class="[
      message.type == 'success' ? 'alert-success' : 'alert-danger',
    ]"
    role="alert"
  >
    <p>{{ message.text }}</p>
  </div>
</template>

<script>
export default {
    props: ['message'],
};
</script>

<style>
</style>