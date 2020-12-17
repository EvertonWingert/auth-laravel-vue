<template>
    <ul class="erro" v-if="erros.lenght > 0">
        <li v-for="(erro, index) in erros" :key="index" v-html="erro"></li>
    </ul>
</template>

<script>
export default {
    name: "ErroNotificacao",
    props: {
        erros: Array
    }
}
</script>

<style>

</style>