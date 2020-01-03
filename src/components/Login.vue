<template lang="html">
    <section class="Login">
        <div class="wrapper fadeInDown">
            <div id="formContent">

                <img src="../assets/fortebank-logo.png" id="icon" alt="User Icon"/>

                <form
                        @submit="loginFunc"
                >
                    <input type="text"
                           id="login"
                           name="login"
                           v-model="login"
                           v-bind:placeholder="[[placeholderLogin]]">
                    <input type="text"
                           id="password"
                           name="password"
                           v-model="password"
                           v-bind:placeholder="[[placeholderPassword]]">
                    <input type="submit" v-bind:value="[[loginBtnText]]">
                </form>

                <div id="formFooter" class="underlineHover" >
                    {{forgotPasswordBtnText}}?
                </div>

            </div>
        </div>

    </section>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                placeholderLogin: 'Логин',
                placeholderPassword: 'Пароль',
                loginBtnText: 'Авторизация',
                forgotPasswordBtnText: 'Забыли Пароль',
                login: null,
                password: null
            }
        },
        methods:{
            loginFunc(){
                let tmpObj = {"login":this.login,"password":this.password};
                localStorage.setItem('login',JSON. stringify(tmpObj));
                
            }
        }
    }
</script>

<style scoped>

</style>