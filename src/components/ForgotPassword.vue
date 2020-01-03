<template lang="html">
    <section class="ForgotPassword">
        <div class="wrapper fadeInDown">
            <div id="formContent">
                <div>
                    <img src="../assets/fortebank-logo.png" id="icon" alt="User Icon" />
                </div>

                <form @submit="loginFunc">
                    <input
                            type="text"
                            id="login"
                            class="fadeIn second"
                            name="login"
                            v-bind:placeholder="[[placeholderRegistrationLogin]]"
                            v-model="login"
                    >
                    <input type="submit" v-bind:value="[[plholdSendPassword]]">
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ForgotPassword",
        data (){
            return {
                placeholderRegistrationLogin: 'Логин',
                plholdSendPassword: 'Отправить пароль',
                login: null
            }
        },
        methods: {
            loginFunc(){
                // eslint-disable-next-line no-console
                console.log("loginFunc");
            }
        }
    }
</script>

<style scoped>

</style>