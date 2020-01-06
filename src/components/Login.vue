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
    /* eslint-disable no-console */

    export default {
        name: "Login",
        props:{
            page:String,
            NavComponent: String
        },
        data(){
            return {
                placeholderLogin: 'Логин',
                placeholderPassword: 'Пароль',
                loginBtnText: 'Авторизация',
                forgotPasswordBtnText: 'Забыли Пароль',
                login: null,
                password: null,
                Autharized: true
            }
        },
        methods:{
            loginFunc(){
                let tmpObj = {"login":this.login,"password":this.password};
                localStorage.setItem('login',JSON. stringify(tmpObj));

                //Авторизация успешная
                this.NavComponent = "IdeaList";
                this.NavComponent = "IdeaList";
                this.Autharized = true;
                this.$emit('NavComponentChanged',this.NavComponent);
                this.$emit('PageChanged',this.page);
            }
        },
        mounted(){

            console.log("mounted Login this.page)" + this.page);
            console.log("mounted Login this.NavComponent)" + this.NavComponent);
        }
    }
</script>

<style scoped>

</style>