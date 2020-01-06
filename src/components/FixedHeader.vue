<template lang="html">

    <section class="FixedHeader">
        <div id="navbar" class="navbar navbar-light bg-light">
            <div class="navbar-brand">
                <a class="border" >{{indexBtnText}}</a>
                <a class="border" >{{instructionBtnText}}</a>
            </div>
            <div id="navbar_left_btns" class="form-inline">
            </div>
            <div>
                <button class="btn btn-outline-success my-2 my-sm-0"
                        @click="changePage"
                        v-if="page=='Main'"
                >{{navBtnCreateText}}
                </button>&nbsp;

                <button class="btn btn-outline-success my-2 my-sm-0"
                        @click="changePage"
                        v-if="page=='Main'"
                >{{navBtnBackText}}
                </button>&nbsp;

                <button class="btn btn-outline-success my-2 my-sm-0"
                        @click="changePage"
                >{{navBtnText}}
                </button>&nbsp;
            </div>


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
                navBtnText: "Регистрация",
                navBtnBackText: "Назад",
                navBtnCreateText: "Создать Идею lean",
                page:""
            }
        },
        methods: {
            changePage: function () {
                switch(localStorage.getItem("page")) {
                    case null:
                        // eslint-disable-next-line no-console
                        console.log("changePage Case null");
                        localStorage.clear();
                        localStorage.setItem("page","Login");
                        this.$emit('pageChanged',localStorage.getItem("page"));
                        this.navBtnText = "Регистрация"
                        break;

                    case "Main":
                        // eslint-disable-next-line no-console
                        console.log("changePage Case Main");
                        localStorage.clear();
                        localStorage.setItem("page","Login");
                        this.$emit('pageChanged',localStorage.getItem("page"));
                        this.navBtnText = "Выход"
                        break;

                    case "ForgotPassword":
                        // eslint-disable-next-line no-console
                        console.log("changePage Case ForgotPassword");
                        localStorage.setItem("page","Login");
                        this.$emit('pageChanged',localStorage.getItem("page"));
                        this.navBtnText = "Регистрация";
                        break;

                    case "Login":
                        // eslint-disable-next-line no-console
                        console.log("changePage Case Login");
                        localStorage.setItem("page","ForgotPassword");
                        this.$emit('pageChanged',localStorage.getItem("page"));
                        this.navBtnText = "Авторизация"
                        break;
                }

            }
        },
        mounted(){
            switch(localStorage.getItem("page")) {
                case "Main":
                    this.navBtnText = "Выход"
                    this.page = "Main"
                    break;
            }

        }
    }

</script>

<style scoped lang="scss">

</style>
