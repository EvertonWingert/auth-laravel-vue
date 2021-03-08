<template>
  <div
    class="container "
    style="height: 100vh"
  >
   <div class="card card rounded shadow p-3">
      <div class="card-body">
        <h5 class="card-title text-center">Edit event</h5>
        <form>
          <div class="form">
            <div class="col-auto mb-3">
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
            <div class="col-auto mb-3">
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
            <div class="col-auto mb-3">
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
            <div class="col-auto mb-3">
              <button
                @click.prevent="updateEvent()"
                class="btn btn-warning"
                v-bind:disabled="loading"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  props: ["id"],
  data() {
    return {
      formData: {
        id: null,
        name: null,
        date: null,
        desc: null,
      },
      message: {
        type: null,
        text: null,
      },
    };
  },
  validations: {
    formData: {
      name: { required },
      date: { required },
      desc: { required },
    },
  },
  computed: {
    loading() {
      return this.$store.state.isLoading;
    },
    tableData() {
      return this.$store.state.table;
    },
    error() {
      return this.$store.state.error;
    },
  },
  methods: {

    async updateEvent() {
      console.log(this.formData);
      if (!this.$v.$invalid) {
        this.$store.dispatch("updateTable", this.formData).then((_) => {
          this.error ? Swal.fire('Oops...', this.$store.state.error, 'error')
 : Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
});
        });
      } else {
        this.$v.$touch();
      }
    },
    fetchData() {
      this.$store.dispatch("showTable", this.id).then((response) => {
        this.formData = response.data.content;
      });
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style>
</style>