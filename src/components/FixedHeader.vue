<template lang="html">

    <section class="FixedHeader">

        <div id="navbar" class="navbar navbar-light bg-light">
            <div class="navbar-brand">
                <a class="border">ForteIdea</a>
                {{path}}
            </div>
            <div id="navbar_left_btns" class="form-inline">
            </div>
            <div>

                <router-link
                        tag="button"
                        class="btn btn-outline-success my-2 my-sm-0"
                        to="/CreateUserExpIssue"
                        v-if="path==='/ViewUserExp'">
                    Новая заявка
                </router-link>&nbsp;
                <button class="btn btn-outline-success my-2 my-sm-0"
                        v-if="path==='/IdeaDetailed'"
                        @click="CreateUpdateIdea"
                >
                    Создать/Изменить
                </button>&nbsp;
                <!-- Example single danger button -->
                <router-link tag="button"
                             to="/"
                             class="btn btn-outline-success my-2 my-sm-0"
                        @click="goBack"
                             v-if="path!='/'">
                    Назад
                </router-link>&nbsp;
                <button class="btn btn-outline-success my-2 my-sm-0"
                        @click="changeAutharizedToggle">
                    {{navBtnText}}
                </button>&nbsp;

            </div>
        </div>
    </section>
</template>

<script lang="js">
    /* eslint-disable no-console */
    export default {
        name: 'FixedHeader',
        data() {
            return {
                navBtnText:"Авторизация",
                CustExpType:['Я - клиент', 'Я - менеджер', 'Ревизорро']
            }
        },
        mounted() {
            switch (this.NavComponent) {
                case "IdeaList":
                    this.navBtnText = "Выход"
                    break;

                case "IdeaDetailed":
                    this.navBtnText = "Выход"
                    break;
            }
        },
        methods: {
            CreateUpdateIdea(){
                console.log(this.selectedItem)
            },
            changeAutharizedToggle: function () {
                localStorage.clear();
                this.$store.commit('switchAuthorizedToggle', false)

            },
            goBack() {
                switch (this.$route.fullPath) {
                    case '/IdeaDetailed':
                        this.$router.push('/IdeaList')
                        break;
                    case '/ViewUserExp':
                        this.$router.push('/IdeaList')
                        break;
                    case '/CreateUserExpIssue':
                        this.$router.push('/ViewUserExp')
                        break;
                    default:
                        this.$router.push('/IdeaList')
                        break;
                }
            },
        },
        computed: {
            NavComponent() {
                return this.$store.getters.computedNavComponent
            },
            Authorized() {
                return this.$store.getters.computedAuthorizedToggle
            },
            path(){
                return this.$route.fullPath;
            },
            selectedItem() {
                return this.$store.getters.computedSelectedItem
            },
        },

    }

</script>

<style scoped lang="scss">

</style>
