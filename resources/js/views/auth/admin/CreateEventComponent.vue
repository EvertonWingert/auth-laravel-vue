<template>
  <div class="container">
    <div class="card card rounded shadow">
      <div class="card-body">
        <h5 class="card-title">Create event</h5>
        <form>
          <div class="form">
            <div class="col-auto mb-3">
              <input
                type="text"
                v-model="formData.name"
                class="form-control"
                placeholder="Nome"
                :class="{
                  'is-invalid':
                    error.hasOwnProperty('name') || $v.formData.name.$error,
                }"
              />
              <div v-if="$v.formData.name.$error" class="invalid-feedback">
                Este campo é requerido.
              </div>
              <div v-if="error" class="invalid-feedback">
                <div v-for="(v, k) in error.name" :key="k" role="alert">
                  <p>{{ v }}</p>
                </div>
              </div>
            </div>
            <div class="col-auto mb-3">
              <input
                type="date"
                v-model="formData.date"
                class="form-control"
                placeholder="Data"
                max="9999-12-31"
                :class="{
                  'is-invalid':
                    error.hasOwnProperty('date') || $v.formData.date.$error,
                }"
              />
              <div v-if="$v.formData.date.$error" class="invalid-feedback">
                Este campo é requerido.
              </div>
              <div v-if="error" class="invalid-feedback">
                <div v-for="(v, k) in error.date" :key="k" role="alert">
                  <p>{{ v }}</p>
                </div>
              </div>
            </div>
            <div class="col-auto mb-3">
              <input
                type="text"
                v-model="formData.desc"
                class="form-control"
                placeholder="Descrição"
                :class="{
                  'is-invalid':
                    error.hasOwnProperty('desc') || $v.formData.desc.$error,
                }"
              />
              <div v-if="$v.formData.desc.$error" class="invalid-feedback">
                Este campo é requerido.
              </div>
              <div v-if="error" class="invalid-feedback">
                <div v-for="(v, k) in error.desc" :key="k" role="alert">
                  <p>{{ v }}</p>
                </div>
              </div>
            </div>
            <div class="col-auto mb-3">
              <button
                @click.prevent="saveData()"
                class="btn btn-primary"
                v-bind:disabled="loading"
              >
                Enviar
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
import Swal from "sweetalert2";

export default {
  data() {
    return {
      formData: {
        id: null,
        name: null,
        date: null,
        desc: null,
      },
      message: {
        type: "",
        text: "",
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
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    saveData() {
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("createTable", this.formData)
          .then((_) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Criado com sucesso",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((_) =>
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Erro ao editar",
              showConfirmButton: false,
              timer: 1500,
            })
          );
      } else {
        this.$v.$touch();
      }
    },
  },
};
</script>

<style>
</style>