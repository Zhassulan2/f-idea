<template>
    <section>
        <v-container class="px-0 p-0" fluid>
            <div v-if="selectedClientExp.id != null">
                <div>
                    <v-row align="center">
                        <v-col cols="12" sm="3">
                            <blockquote class="blockquote">
                                <footer class="blockquote-footer">Филиал</footer>
                                <p class="mb-0">
                                    {{selectedClientExp.filial.name}}
                                </p>
                            </blockquote>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <blockquote class="blockquote">
                                <footer class="blockquote-footer">Отделение</footer>
                                <p class="mb-0">
                                    {{selectedClientExp.branch.name}}
                                </p>
                            </blockquote>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <blockquote class="blockquote">
                                <footer class="blockquote-footer">Вид</footer>
                                <p class="mb-0">
                                    {{selectedClientExp.orderType ==='CLIENT' ?'Я Клиент':'Я Менеджер' }}
                                </p>
                            </blockquote>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <blockquote class="blockquote">
                                <footer class="blockquote-footer">Дата создания</footer>
                                <p class="mb-0">
                                    {{selectedClientExp.initDate}}
                                </p>
                            </blockquote>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="12" sm="6">
                            <blockquote class="blockquote">
                                <footer class="blockquote-footer">Операция</footer>
                                <p class="mb-0">
                                    {{selectedClientExp.operation.name}}
                                </p>
                            </blockquote>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <blockquote class="blockquote">
                                <footer class="blockquote-footer">Инициатор</footer>
                                <p class="mb-0">
                                    {{selectedClientExp.initiator.fullname}}
                                </p>
                            </blockquote>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="12" sm="12">
                            <blockquote class="blockquote">
                                <footer class="blockquote-footer">Мой Опыт</footer>
                                <p class="mb-0">
                                    {{selectedClientExp.experience}}
                                    <br>
                                    {{selectedClientExp}}
                                </p>
                            </blockquote>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="12" sm="12">
                            <blockquote class="blockquote">
                                <footer class="blockquote-footer">Идея</footer>
                                <p class="mb-0">
                                    {{selectedClientExp.problem}}
                                    <br>
                                    {{selectedClientExp}}
                                </p>
                            </blockquote>
                        </v-col>
                    </v-row>
                    <hr>
                </div>
            </div>
            <div v-if="selectedRevizorroExp.id != null">
                {{selectedRevizorroExp}}
                <div
                        v-bind:key="qs.id"
                        v-for="qs in selectedRevizorroExp.categories"
                        v-bind:index="qs.id"
                >
                    <table class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th scope="col" style="width: 10%">{{qs.id}}</th>
                            <th scope="col" style="width: 70%">{{qs.name}}</th>
                            <th scope="col" style="width: 20%"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-bind:key="q.id" v-for="q in qs.answers">
                            <th scope="row">{{qs.id}}.{{q.id}}</th>
                            <td>{{q}}</td>
                            <td>
                                <v-switch
                                        disabled
                                        v-model="q.switcher"
                                        :label="`Ответ: ${q.switcher?'Да':'Нет'}`"
                                ></v-switch>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </v-container>

    </section>
</template>

<script>
    export default {
        name: "ViewUserExp",
        data() {
            return {
                questions: [
                    {
                        id: 1,
                        name: "Навигация",
                        question: [
                            {
                                id: 1,
                                text: "Вы легко нашли отделение?(внешняя навигация)",
                                switcher: false,
                            },
                            {
                                id: 2,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: true,
                            },
                            {
                                id: 3,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        name: "Работоспособность АТМ/ТС. Удобство интерфейса",
                        question: [
                            {
                                id: 1,
                                text: "Вы легко нашли отделение?(внешняя навигация)",
                                switcher: true,
                            },
                            {
                                id: 2,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: false,
                            },
                            {
                                id: 3,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: false,
                            },
                        ],
                    },
                    {
                        id: 3,
                        name: "Очередь",
                        question: [
                            {
                                id: 1,
                                text: "Вы легко нашли отделение?(внешняя навигация)",
                                switcher: true,
                            },
                            {
                                id: 2,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: true,
                            },
                            {
                                id: 3,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: true,
                            },
                        ],
                    },
                    {
                        id: 4,
                        name: "Рекламная продукция",
                        question: [
                            {
                                id: 1,
                                text: "Вы легко нашли отделение?(внешняя навигация)",
                                switcher: false,
                            },
                            {
                                id: 2,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: true,
                            },
                            {
                                id: 3,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: false,
                            },
                        ],
                    },
                    {
                        id: 5,
                        name: "Рекламная продукция",
                        question: [
                            {
                                id: 1,
                                text: "Вы легко нашли отделение?(внешняя навигация)",
                                switcher: true,
                            },
                            {
                                id: 2,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: false,
                            },
                            {
                                id: 3,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: false,
                            },
                        ],
                    },
                    {
                        id: 6,
                        name: "Рекламная продукция",
                        question: [
                            {
                                id: 1,
                                text: "Вы легко нашли отделение?(внешняя навигация)",
                                switcher: false,
                            },
                            {
                                id: 2,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: false,
                            },
                            {
                                id: 3,
                                text: "Фасадная вывеска с названием банка в надлежащем состоянии?",
                                switcher: true,
                            },
                        ],
                    },
                ],
                viewType: '',
                customText: 'asdfasdfasd',
                longText: `asdfasdfasdfasfasdfasdfasdfasdfasdfasdfasdfasdfasd`,
                fab: false,
                hidden: false,
                viewIdeas: false,
            }
        },
        computed: {
            clientExp() {
                return this.$store.getters.computedClientExp;
            },
            selectedClientExp() {
                return this.$store.getters.computedSelectedClientExp
            },
            selectedRevizorroExp() {
                return this.$store.getters.computedSelectedRevizorroExp
            },
        }
    }
</script>

<style scoped>
    .blockquote {
        margin: 0px 0px 0px 0px;
    }

    blockquote.blockquote {
        padding: 5px 0px 10px 16px;
    }
</style>