<template lang="html">
    <section class="Autharize">
        <FixedHeader @pageChanged="page=$event"></FixedHeader>
        <login v-if="page=='Login'" ></login>
        <forgot-password v-if="page=='ForgotPassword'" ></forgot-password>
        {{this.page}}
    </section>
</template>

<script lang="js">
    import ForgotPassword from "@/components/ForgotPassword";
    import Login from "@/components/Login";
    import FixedHeader from "@/components/FixedHeader";

    export default {
        name: "Authorize"
        , components: {
            FixedHeader,
            ForgotPassword,
            Login
        },
        props:{
            page: String,

        },
        mounted() {
            if (this.page == null) this.page = 'Login';
        },

    }
</script>

<style scoped>

</style>