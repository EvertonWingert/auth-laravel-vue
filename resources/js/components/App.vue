<template>
    <div>
        <navbar/>
        <router-view/>
    </div>
</template>

<script>
export default {
    created(){
        if($cookies.get("token")){
            this.$store.commit("UPDATE_LOGIN", true);
            //Loga usuario
            //this.$store.dispatch("getUsuario");
        }
    }
}
</script>

<style>

</style>