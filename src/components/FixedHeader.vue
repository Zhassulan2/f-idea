<template lang="html">

    <section class="FixedHeader">
        <div id="navbar" class="navbar navbar-light bg-light">
            <div class="navbar-brand">
                <a class="border" >{{indexBtnText}}</a>
                <a class="border" >{{instructionBtnText}}</a>
            </div>
            <div id="navbar_left_btns" class="form-inline">
            </div>

            <button class="btn btn-outline-success my-2 my-sm-0"
                    @click="changePage"
            >{{navBtnText}}
            </button>

        </div>

    </section>

</template>

<script lang="js">

    export default {
        name: 'FixedHeader',
        data() {
            return {
                indexBtnText: 'ForteIdea',
                instructionBtnText: 'Инструкция',
                navBtnText: "Регистрация"
            }
        },
        methods: {
            changePage: function () {
                switch(localStorage.getItem("page")) {
                    case null:
                        localStorage.clear();
                        localStorage.setItem("page","Login");
                        this.$emit('pageChanged',localStorage.getItem("page"));
                        this.navBtnText = "Регистрация"
                        break;

                    case "Main":
                        localStorage.clear();
                        localStorage.setItem("page","Login");
                        this.$emit('pageChanged',localStorage.getItem("page"));
                        this.navBtnText = "Регистрация"
                        break;

                    case "ForgotPassword":
                        localStorage.setItem("page","Login");
                        this.$emit('pageChanged',localStorage.getItem("page"));
                        this.navBtnText = "Регистрация";
                        break;

                    case "Login":
                        localStorage.setItem("page","ForgotPassword");
                        this.$emit('pageChanged',localStorage.getItem("page"));
                        this.navBtnText = "Авторизация"
                        break;
                }

            }
        },
        mounted(){
            this.changePage();

        }
    }

</script>

<style scoped lang="scss">

</style>
