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
                navBtnText: 'Регистрация',
                page: 'Login'
            }
        },
        methods: {
            changePage: function () {
                if (this.page == 'Login') {
                    this.page = 'ForgotPassword';
                    this.$emit('pageChanged',this.page);
                    this.navBtnText = "Авторизация"
                } else {
                    this.page = 'Login';
                    this.$emit('pageChanged',this.page);
                    this.navBtnText = "Регистрация"
                }

            }
        },
        mounted(){
            if (this.page == null) this.page = 'Login';
        }
    }

</script>

<style scoped lang="scss">

</style>
